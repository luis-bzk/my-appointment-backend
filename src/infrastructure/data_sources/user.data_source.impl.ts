import { Pool } from 'pg';

import {
  CreateUserDto,
  GetAllUsersDto,
  UpdateUserDto,
} from '../../domain/dtos/user';
import { PostgresDatabase } from '../../data';
import { GeneratorValues } from '../../utils';
import { UserDB } from '../../data/interfaces';
import { CustomError } from '../../domain/errors';
import { BcryptAdapter } from '../../config/bcrypt';
import { RECORD_STATUS } from '../../shared/constants';
import { UserDataSource } from '../../domain/data_sources';

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
        where use.use_email = $1
          and use.use_record_status = $2;`,
        [email, RECORD_STATUS.AVAILABLE],
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
        where use.use_email = $1 and use.use_id <> $2 and use.use_record_status = $3;`,
        [email, id, RECORD_STATUS.AVAILABLE],
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
        where use_id = $4 and use_record_status = $5
        returning *;`,
        [name, last_name, email, id, RECORD_STATUS.AVAILABLE],
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
        where use.use_id = $1 and use.use_record_status = $2;`,
        [id, RECORD_STATUS.AVAILABLE],
      );

      return userFound.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al obtener');
    }
  }

  async getAllUsers(getAllUsersDto: GetAllUsersDto): Promise<UserDB[]> {
    const { limit, offset } = getAllUsersDto;

    try {
      const users = await this.pool.query<UserDB>(
        `select use.use_id, use.use_name, use.use_last_name, use.use_email,
          use.use_password, use.use_token, use.use_created_date, use.use_record_status
        from core.core_user use
        where use.use_record_status = $1
        order by use.use_id desc limit $2 offset $3;`,
        [RECORD_STATUS.AVAILABLE, limit, offset],
      );

      return users.rows;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer(`Error en el Data Source al obtener`);
    }
  }

  async deleteUser(id: number): Promise<UserDB | null> {
    try {
      // delete user
      const deleted = await this.pool.query<UserDB>(
        `delete from core.core_user
        where use_id = $1 returning *;`,
        [id],
      );

      return deleted.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer(`Error en el Data Source al eliminar`);
    }
  }
}
