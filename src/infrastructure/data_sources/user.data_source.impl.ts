import { Pool } from 'pg';

import {
  CreateUserDto,
  DeleteUserDto,
  GetAllUsersDto,
  GetUserDto,
  UpdateUserDto,
} from '../../domain/dtos/user';
import { User } from '../../domain/entities';
import { PostgresDatabase } from '../../data';
import { GeneratorValues } from '../../utils';
import { UserDB } from '../../data/interfaces';
import { CustomError } from '../../domain/errors';
import { BcryptAdapter } from '../../config/bcrypt';
import { UserMapper } from '../mappers/user.mapper';
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

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, last_name, email } = createUserDto;

    try {
      // search user with same email
      const userEmail = await this.pool.query<UserDB>(
        `select
          use.use_id,
          use.use_record_status
        from
          core.core_user use
        where
          use.use_email = $1
          and use.use_record_status = $2;`,
        [email, RECORD_STATUS.AVAILABLE],
      );
      if (userEmail.rows.length > 0) {
        throw CustomError.conflict(
          `Ya existe un usuario registrado con este correo electrónico`,
        );
      }

      const generatedPassword = GeneratorValues.passwordGenerator();
      // create user
      const createdUser = await this.pool.query<UserDB>(
        `insert into
          core.core_user (
            use_name,
            use_last_name,
            use_email,
            use_password,
            use_token,
            use_created_date,
            use_record_status
          )
        values
          ($1, $2, $3, $4, $5, $6, $7)
        returning
          *;`,
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

      return UserMapper.entityFromObject(
        { ...createdUser.rows[0], use_password: generatedPassword },
        true,
      );
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al crear');
    }
  }

  async update(updateUserDto: UpdateUserDto): Promise<User> {
    const { id, email, name, last_name } = updateUserDto;

    try {
      // search user registered
      const userFound = await this.pool.query<UserDB>(
        `select
          use.use_id,
          use.use_record_status
        from
          core.core_user use
        where
          use.use_id = $1
          and use.use_record_status = $2;`,
        [id, RECORD_STATUS.AVAILABLE],
      );
      if (userFound.rows.length === 0) {
        throw CustomError.notFound(
          `No se ha encontrado el usuario a actualizar`,
        );
      }

      // user with email
      const userWithEmail = await this.pool.query<UserDB>(
        `select
          use.use_id,
          use.use_email,
          use.use_record_status
        from
          core.core_user use
        where
          use.use_email = $1
          and use.use_id <> $2
          and use.use_record_status = $3;`,
        [email, id, RECORD_STATUS.AVAILABLE],
      );
      if (userWithEmail.rows.length >= 1) {
        throw CustomError.conflict(
          `Ya existe un usuario con el email ingresado`,
        );
      }

      // update user
      const updatedUser = await this.pool.query<UserDB>(
        `update core.core_user
        set
          use_name = $1,
          use_last_name = $2,
          use_email = $3
        where
          use_id = $4
          and use_record_status = $5
        returning
          *;`,
        [name, last_name, email, id, RECORD_STATUS.AVAILABLE],
      );

      return UserMapper.entityFromObject(updatedUser.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al actualizar');
    }
  }

  async get(getUserDto: GetUserDto): Promise<User> {
    const { id } = getUserDto;

    try {
      const userFound = await this.pool.query<UserDB>(
        `select
          use.use_id,
          use.use_name,
          use.use_last_name,
          use.use_email,
          use.use_password,
          use.use_token,
          use.use_created_date,
          use.use_record_status
        from
          core.core_user use
        where
          use.use_id = $1
          and use.use_record_status = $2;`,
        [id, RECORD_STATUS.AVAILABLE],
      );
      if (userFound.rows.length === 0) {
        throw CustomError.notFound(`No se ha encontrado el usuario solicitado`);
      }

      return UserMapper.entityFromObject(userFound.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al obtener');
    }
  }

  async getAll(getAllUsersDto: GetAllUsersDto): Promise<User[]> {
    const { limit, offset } = getAllUsersDto;

    try {
      const users = await this.pool.query<UserDB>(
        `select
          use.use_id,
          use.use_name,
          use.use_last_name,
          use.use_email,
          use.use_password,
          use.use_token,
          use.use_created_date,
          use.use_record_status
        from
          core.core_user use
        where
          use.use_record_status = $1
        order by
          use.use_id desc
        limit $2 offset $3;`,
        [RECORD_STATUS.AVAILABLE, limit, offset],
      );

      return UserMapper.entitiesFromArray(users.rows);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer(`Error en el Data Source al obtener`);
    }
  }

  async delete(deleteUserDto: DeleteUserDto): Promise<User> {
    const { id } = deleteUserDto;

    try {
      // search user
      const userFound = await this.pool.query<UserDB>(
        `select
          use.use_id,
          use.use_record_status
        from
          core.core_user use
        where
          use.use_id = $1
          and use.use_record_status = $2;`,
        [id, RECORD_STATUS.AVAILABLE],
      );
      if (userFound.rows.length === 0) {
        throw CustomError.notFound(`No se ha encontrado el usuario a eliminar`);
      }

      // delete user
      const deleted = await this.pool.query<UserDB>(
        `delete from core.core_user
        where
          use_id = $1
        returning
          *;`,
        [id],
      );

      return UserMapper.entityFromObject(deleted.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer(`Error en el Data Source al eliminar`);
    }
  }
}
