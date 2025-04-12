import { Pool } from 'pg';

import {
  ChangePasswordDto,
  GoogleAuthDto,
  SignupUserDto,
} from '../../domain/dtos/auth';
import { AuthDataSource } from '../../domain/data_sources';
import { BcryptAdapter } from '../../config';
import { CustomError } from '../../domain/errors';
import { GeneratorValues } from '../../utils';
import { PostgresDatabase } from '../../data';
import { RECORD_STATUS } from '../../shared/constants';
import { User } from '../../domain/entities';
import { UserDB } from '../../data/interfaces';
import { UserMapper } from '../mappers/user.mapper';

type HashFunction = (password: string) => string;

export class AuthDataSourceImpl implements AuthDataSource {
  private pool: Pool;
  private readonly hashPassword: HashFunction;

  constructor() {
    this.pool = PostgresDatabase.getPool();
    this.hashPassword = BcryptAdapter.hash;
  }

  async findUserByEmail(email: string): Promise<UserDB | null> {
    try {
      const response = await this.pool.query<UserDB>(
        `select use_id, use_name, use_last_name, use_email,
          use_password, use_token, use_created_date, use_record_status
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

  async createUser(signupUserDto: SignupUserDto): Promise<UserDB | null> {
    const { name, last_name, email, password } = signupUserDto;

    try {
      // create user
      const userCreated = await this.pool.query<UserDB>(
        `insert into
          core.core_user (
            use_name, use_last_name, use_email, use_password,
            use_token, use_created_date, use_record_status
          ) values ($1, $2, $3, $4, $5, $6, $7) returning *;`,
        [
          name,
          last_name,
          email,
          this.hashPassword(password),
          GeneratorValues.tokenGenerator(),
          new Date(),
          RECORD_STATUS.AVAILABLE,
        ],
      );

      return userCreated.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al registrar');
    }
  }

  async generateToken(userId: number): Promise<UserDB | null> {
    try {
      const update_user = await this.pool.query<UserDB>(
        `update core.core_user
        set use_token = $1
        where use_id = $2
          and use_record_status = $3 returning *;`,
        [GeneratorValues.tokenGenerator(), userId, RECORD_STATUS.AVAILABLE],
      );

      return update_user.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer(
        'Error en el Data Source al recuperar la contraseña',
      );
    }
  }

  async findUserByToken(token: string): Promise<UserDB | null> {
    try {
      const user_found = await this.pool.query<UserDB>(
        `select use_id, use_record_status
        from core.core_user use
        where use.use_token = $1
          and use.use_record_status = $2;`,
        [token, RECORD_STATUS.AVAILABLE],
      );

      return user_found.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer(
        'Error en el Data Source al cambiar la contraseña',
      );
    }
  }

  async changePassword(
    changePasswordDto: ChangePasswordDto,
  ): Promise<UserDB | null> {
    const { password, token } = changePasswordDto;

    try {
      const updated_user = await this.pool.query<UserDB>(
        `update core.core_user
        set use_token = $1,
          use_password = $2
        where use_token = $3
          and use_record_status = $4 returning *;`,
        [null, this.hashPassword(password), token, RECORD_STATUS.AVAILABLE],
      );

      return updated_user.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer(
        'Error en el Data Source al cambiar la contraseña',
      );
    }
  }

  async cleanToken(token: string): Promise<UserDB | null> {
    try {
      const updated_user = await this.pool.query<UserDB>(
        `update core.core_user
        set use_token = $1
        where use_token = $2
          and use_record_status = $3 returning *;`,
        [null, token, RECORD_STATUS.AVAILABLE],
      );

      return updated_user.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer(
        'Error en el Data Source al confirmar la cuenta',
      );
    }
  }

  async createGoogleUser(googleAuthDto: GoogleAuthDto): Promise<UserDB | null> {
    const { email, name } = googleAuthDto;
    try {
      const generatedPassword = GeneratorValues.passwordGenerator();

      const userCreated = await this.pool.query<UserDB>(
        `insert into
        core.core_user (
          use_name, use_last_name, use_email, use_password, use_token,
          use_created_date,use_record_status
        ) values
        ($1, $2, $3, $4, $5, $6, $7) returning *;`,
        [
          name,
          name,
          email,
          this.hashPassword(generatedPassword),
          '',
          new Date(),
          RECORD_STATUS.AVAILABLE,
        ],
      );

      return userCreated.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer(
        'Error en el Data Source al iniciar sesión',
      );
    }
  }

  // async requireAuth(requireAuthDto: RequireAuthDto): Promise<User | null> {
  //   const { id } = requireAuthDto;

  //   try {
  //     const userFound = await this.pool.query<UserDB>(
  //       `select
  //         use.use_id, use.use_name, use.use_last_name, use.use_email,
  //         use.use_password, use.use_token, use.use_created_date, use.use_record_status
  //       from core.core_user use
  //       where use.use_id = $1
  //         and use.use_record_status = $2;`,
  //       [id, RECORD_STATUS.AVAILABLE],
  //     );
  //     if (userFound.rows.length === 0) {
  //       throw CustomError.notFound(`No se ha encontrado el usuario solicitado`);
  //     }

  //     return UserMapper.entityFromObject(userFound.rows[0]);
  //   } catch (error) {
  //     if (error instanceof CustomError) {
  //       throw error;
  //     }

  //     throw CustomError.internalServer('Error en el Data Source al obtener');
  //   }
  // }
  async googleAuth(googleAuthDto: GoogleAuthDto): Promise<User | null> {
    const { email, name } = googleAuthDto;
    try {
      const response = await this.pool.query<UserDB>(
        `select
          use_id, use_name, use_last_name, use_email, use_password,
          use_token, use_created_date, use_record_status
        from core.core_user use
        where use.use_email = $1
          and use.use_record_status = $2;`,
        [email, RECORD_STATUS.AVAILABLE],
      );

      if (response.rows.length === 0) {
        // create user
        const generatedPassword = GeneratorValues.passwordGenerator();

        const userCreated = await this.pool.query<UserDB>(
          `insert into
          core.core_user (
            use_name, use_last_name, use_email, use_password, use_token,
            use_created_date,use_record_status
          ) values
          ($1, $2, $3, $4, $5, $6, $7) returning *;`,
          [
            name,
            name,
            email,
            this.hashPassword(generatedPassword),
            GeneratorValues.tokenGenerator(),
            new Date(),
            RECORD_STATUS.AVAILABLE,
          ],
        );

        // TODO: create role
        return UserMapper.entityFromObject(userCreated.rows[0]);
      }

      return UserMapper.entityFromObject(response.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer(
        'Error en el Data Source al iniciar sesión',
      );
    }
  }
}
