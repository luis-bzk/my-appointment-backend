import { Pool } from 'pg';

import { PostgresDatabase } from '../../data';
import { GeneratorValues } from '../../utils';
import { TotalQueryDB, UserDB } from '../../data/interfaces';
import { CustomError } from '../../domain/errors';
import { BcryptAdapter } from '../../config/bcrypt';
import { RECORD_STATUS } from '../../shared/constants';
import { UserDataSource } from '../../ports/data_sources';
import { CreateUserDto, UpdateUserDto } from '../../domain/schemas/user';
import { GetAllFiltersDto } from '../../domain/schemas/general';

type HashFunction = (password: string) => string;

export class UserDataSourceImpl implements UserDataSource {
  private pool: Pool;
  private readonly hashPassword: HashFunction;

  constructor() {
    this.pool = PostgresDatabase.getPool();
    this.hashPassword = BcryptAdapter.hash;
  }

  async findUserByEmail(email: string): Promise<UserDB | null> {
    try {
      const response = await this.pool.query<UserDB>(
        `select use.use_id, use.use_name, use.use_last_name, use.use_email,
          use.use_password, use.use_token, use.use_created_date, use.use_record_status
        from core.core_user use
        where use.use_email = $1;`,
        [email],
      );
      return response.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer(
        'Error en el Data Source al buscar usuario por email',
      );
    }
  }

  async createNewUser(createUserDto: CreateUserDto): Promise<UserDB | null> {
    const { name, last_name, email } = createUserDto;

    try {
      const generatedPassword = GeneratorValues.passwordGenerator();
      // create user
      const createdUser = await this.pool.query<UserDB>(
        `insert into core.core_user (
            use_name, use_last_name, use_email, use_password,
            use_token, use_created_date, use_record_status )
        values ($1, $2, $3, $4, $5, $6, $7) returning *;`,
        [
          name,
          last_name,
          email,
          this.hashPassword(generatedPassword),
          null,
          new Date(),
          RECORD_STATUS.AVAILABLE,
        ],
      );

      return { ...createdUser.rows[0], use_password: generatedPassword };
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al crear');
    }
  }

  async findUserByEmailId(id: number, email: string): Promise<UserDB | null> {
    try {
      // user with email
      const userWithEmail = await this.pool.query<UserDB>(
        `select use.use_id, use.use_name, use.use_last_name, use.use_email,
          use.use_password, use.use_token, use.use_created_date, use.use_record_status
        from core.core_user use
        where use.use_email = $1 and use.use_id <> $2;`,
        [email, id],
      );

      return userWithEmail.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al actualizar');
    }
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<UserDB | null> {
    const { id, email, name, last_name } = updateUserDto;

    try {
      // update user
      const updatedUser = await this.pool.query<UserDB>(
        `update core.core_user
        set use_name = $1, use_last_name = $2, use_email = $3
        where use_id = $4 returning *;`,
        [name, last_name, email, id],
      );

      return updatedUser.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al actualizar');
    }
  }

  async findUserById(id: number): Promise<UserDB | null> {
    try {
      const userFound = await this.pool.query<UserDB>(
        `select use.use_id, use.use_name, use.use_last_name, use.use_email,
          use.use_password, use.use_token, use.use_created_date, use.use_record_status
        from core.core_user use
        where use.use_id = $1;`,
        [id],
      );

      return userFound.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al obtener');
    }
  }

  async getAllUsers(getAllUsersDto: GetAllFiltersDto): Promise<UserDB[]> {
    const { limit, offset, filter } = getAllUsersDto;
    try {
      let query = `
        select use.use_id, use.use_name, use.use_last_name, use.use_email,
               use.use_password, use.use_token, use.use_created_date, use.use_record_status
        from core.core_user use`;
      const params: any[] = [];
      let paramIndex = 1;

      if (filter) {
        query += `
          where (
            use.use_name ilike $${paramIndex} OR
            use.use_last_name ilike $${paramIndex} OR
            use.use_email ilike $${paramIndex}
          )
        `;
        params.push(`%${filter}%`);
        paramIndex++;
      }

      query += ` order by use.use_id desc`;

      if (limit) {
        query += ` limit $${paramIndex++}`;
        params.push(limit);
      }

      if (offset) {
        query += ` offset $${paramIndex++}`;
        params.push(offset);
      }

      const users = await this.pool.query<UserDB>(query, params);

      return users.rows;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);
      throw CustomError.internalServer(
        `Error en el Data Source al obtener usuarios`,
      );
    }
  }

  async countAvailableUsers(): Promise<TotalQueryDB | null> {
    try {
      const userFound = await this.pool.query<TotalQueryDB>(
        `select count(cu.use_id) as total from core.core_user cu;`,
        [],
      );

      return userFound.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al obtener');
    }
  }

  async deleteUser(id: number): Promise<UserDB | null> {
    try {
      const updatedUser = await this.pool.query<UserDB>(
        `update core.core_user
        set use_record_status = $1
        where use_id = $2 and use_record_status = $3
        returning *;`,
        [RECORD_STATUS.UNAVAILABLE, id, RECORD_STATUS.AVAILABLE],
      );

      return updatedUser.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer(`Error en el Data Source al eliminar`);
    }
  }

  async getUsersById(ids: number[]): Promise<UserDB[]> {
    try {
      const placeholders = ids.map((_, i) => `$${i + 1}`).join(', ');

      const users = await this.pool.query<UserDB>(
        `select cu.use_id, cu.use_name, cu.use_last_name, cu.use_email, cu.use_password,
        cu.use_token, cu.use_created_date, cu.use_record_status 
        from core.core_user cu where cu.use_id in (${placeholders});`,
        [...ids],
      );

      return users.rows;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer(
        'Error en el Data Source al obtener los usuarios',
      );
    }
  }
}
