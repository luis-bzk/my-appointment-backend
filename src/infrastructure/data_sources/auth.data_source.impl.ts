import { Pool } from 'pg';

import {
  ChangePasswordDto,
  CheckTokenDto,
  ConfirmAccountDto,
  LoginUserDto,
  RecoverPasswordDto,
  RequireAuthDto,
  SignupUserDto,
} from '../../domain/dtos/auth';
import { User } from '../../domain/entities';
import { BcryptAdapter } from '../../config';
import { PostgresDatabase } from '../../data';
import { GeneratorValues } from '../../utils';
import { UserDB } from '../../data/interfaces';
import { CustomError } from '../../domain/errors';
import { UserMapper } from '../mappers/user.mapper';
import { RECORD_STATUS } from '../../shared/constants';
import { AuthDataSource } from '../../domain/data_sources';

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDataSourceImpl implements AuthDataSource {
  private pool: Pool;
  private readonly hashPassword: HashFunction;
  private readonly comparePassword: CompareFunction;

  constructor() {
    this.pool = PostgresDatabase.getPool();
    this.hashPassword = BcryptAdapter.hash;
    this.comparePassword = BcryptAdapter.compare;
  }

  async login(loginUserDto: LoginUserDto): Promise<User> {
    const { email, password } = loginUserDto;
    try {
      const response = await this.pool.query<UserDB>(
        `select
          use_id,
          use_name,
          use_last_name,
          use_email,
          use_password,
          use_token,
          use_created_date,
          use_record_status
        from
          core.core_user use
        where
          use.use_email = $1
          and use.use_record_status = $2;`,
        [email, RECORD_STATUS.AVAILABLE],
      );

      if (response.rows.length === 0) {
        throw CustomError.badRequest('El usuario o contraseña es incorrecto');
      }

      const user_found = response.rows[0];

      const isMatching = this.comparePassword(
        password,
        user_found.use_password,
      );

      if (!isMatching) {
        throw CustomError.badRequest('El usuario o contraseña es incorrecto');
      }
      return UserMapper.entityFromObject(user_found);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer(
        'Error en el Data Source al iniciar sesión',
      );
    }
  }

  async signup(signupUserDto: SignupUserDto): Promise<User> {
    const { name, last_name, email, password } = signupUserDto;

    try {
      // validate email
      const response = await this.pool.query<UserDB>(
        `select
          use_id,
          use_email,
          use_token,
          use_record_status
        from
          core.core_user use
        where
          use.use_email = $1
          and use.use_record_status = $2`,
        [email, RECORD_STATUS.AVAILABLE],
      );

      if (response.rows.length > 0) {
        throw CustomError.badRequest(
          'El email solicitado ya se encuentra registrado',
        );
      }

      // create user
      const userCreated = await this.pool.query<UserDB>(
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
          ($1, $2, $3, $4, $5, $6, $7) returning *;`,
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

      // TODO: create role

      return UserMapper.entityFromObject(userCreated.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al registrar');
    }
  }

  async recoverPassword(recoverPasswordDto: RecoverPasswordDto): Promise<User> {
    const { email } = recoverPasswordDto;

    try {
      const user_found = await this.pool.query<UserDB>(
        `select
          use_id,
          use_email,
          use_record_status
        from
          core.core_user use
        where
          use.use_email = $1
          and use.use_record_status = $2;`,
        [email, RECORD_STATUS.AVAILABLE],
      );
      if (user_found.rows.length === 0) {
        throw CustomError.notFound(
          'No se ha encontrado un usuario asociado a este email',
        );
      }

      const update_user = await this.pool.query<UserDB>(
        `update core.core_user
        set
          use_token = $1
        where
          use_id = $2
          and use_record_status = $3 returning *;`,
        [
          GeneratorValues.tokenGenerator(),
          user_found.rows[0].use_id,
          RECORD_STATUS.AVAILABLE,
        ],
      );

      return UserMapper.entityFromObject(update_user.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer(
        'Error en el Data Source al recuperar la contraseña',
      );
    }
  }

  async changePassword(changePasswordDto: ChangePasswordDto): Promise<User> {
    const { password, token } = changePasswordDto;

    try {
      const user_found = await this.pool.query<UserDB>(
        `select
          use_id,
          use_record_status
        from
          core.core_user use
        where
          use.use_token = $1
          and use.use_record_status = $2;`,
        [token, RECORD_STATUS.AVAILABLE],
      );

      if (user_found.rows.length === 0) {
        throw CustomError.notFound(
          'No se ha encontrado un usuario asociado a este token',
        );
      }

      const updated_user = await this.pool.query<UserDB>(
        `update core.core_user
        set
          use_token = $1,
          use_password = $2
        where
          use_token = $3
          and use_record_status = $4 returning *;`,
        [null, this.hashPassword(password), token, RECORD_STATUS.AVAILABLE],
      );

      return UserMapper.entityFromObject(updated_user.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer(
        'Error en el Data Source al cambiar la contraseña',
      );
    }
  }

  async checkToken(checkTokenDto: CheckTokenDto): Promise<User> {
    const { token } = checkTokenDto;

    try {
      const user_found = await this.pool.query<UserDB>(
        `select
          use_id,
          use_name,
          use_last_name,
          use_email,
          use_password,
          use_token,
          use_created_date,
          use_record_status
        from
          core.core_user use
        where
          use.use_token = $1
          and use.use_record_status = $2;`,
        [token, RECORD_STATUS.AVAILABLE],
      );

      if (user_found.rows.length === 0) {
        throw CustomError.notFound(
          'No se ha encontrado un usuario asociado a este token',
        );
      }

      return UserMapper.entityFromObject(user_found.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer(
        'Error en el Data Source al verificar el token',
      );
    }
  }

  async confirmAccount(confirmAccountDto: ConfirmAccountDto): Promise<User> {
    const { token } = confirmAccountDto;

    try {
      const user_found = await this.pool.query<UserDB>(
        `select
          use.use_id,
          use.use_record_status
        from
          core.core_user use
        where
          use.use_token = $1
          and use.use_record_status = $2;`,
        [token, RECORD_STATUS.AVAILABLE],
      );

      if (user_found.rows.length === 0) {
        throw CustomError.notFound(
          'No se ha encontrado un usuario asociado a este token',
        );
      }

      const updated_user = await this.pool.query<UserDB>(
        `update core.core_user
        set
          use_token = $1
        where
          use_token = $2
          and use_record_status = $3 returning *;`,
        [null, token, RECORD_STATUS.AVAILABLE],
      );

      return UserMapper.entityFromObject(updated_user.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer(
        'Error en el Data Source al confirmar la cuenta',
      );
    }
  }

  async requireAuth(requireAuthDto: RequireAuthDto): Promise<User> {
    const { id } = requireAuthDto;

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
}
