import { Pool } from 'pg';

import {
  CreateUserRoleDto,
  DeleteUserRoleDto,
  GetAllUsersRolesDto,
  GetUserRoleDto,
  UpdateUserRoleDto,
} from '../../domain/dtos/user_role';
import { PostgresDatabase } from '../../data';
import { CustomError } from '../../domain/errors';
import { RECORD_STATUS } from '../../shared/constants';
import { UserRoleMapper } from '../mappers/user_role.mapper';
import { UserRoleDataSource } from '../../domain/data_sources';
import { UserRole, UserRoleDetail } from '../../domain/entities';
import { UserRoleDB, UserRoleDetailDB } from '../../data/interfaces';

export class UserRoleDataSourceImpl implements UserRoleDataSource {
  private pool: Pool;

  constructor() {
    this.pool = PostgresDatabase.getPool();
  }

  async create(createUserRoleDto: CreateUserRoleDto): Promise<UserRole> {
    const { id_user, id_role } = createUserRoleDto;
    try {
      // search if user role exists
      const existsRegister = await this.pool.query<UserRoleDB>(
        `select
          cur.uro_id,
          cur.uro_record_status
        from
          core.core_user_role cur
        where
          cur.id_user = $1
          and cur.id_role = $2
          and cur.uro_record_status = $3;`,
        [id_user, id_role, RECORD_STATUS.AVAILABLE],
      );

      if (existsRegister.rows.length > 0) {
        throw CustomError.conflict(
          'El usuario ya tiene asignado el rol deseado',
        );
      }

      // create
      const createdRegister = await this.pool.query<UserRoleDB>(
        `insert into
          core.core_user_role (
            id_user,
            id_role,
            uro_created_date,
            uro_record_status
          )
        values
          ($1, $2, $3, $4)
        returning
          *;`,
        [id_user, id_role, new Date(), RECORD_STATUS.AVAILABLE],
      );

      return UserRoleMapper.entityFromObject(createdRegister.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al crear');
    }
  }

  async update(updateUserRoleDto: UpdateUserRoleDto): Promise<UserRole> {
    const { id, id_role, id_user } = updateUserRoleDto;

    try {
      // search if exists
      const existsRegister = await this.pool.query<UserRoleDB>(
        `select
          cur.uro_id,
          cur.uro_record_status
        from
          core.core_user_role cur
        where
          cur.uro_id = $1
          and cur.uro_record_status = $2;`,
        [id, RECORD_STATUS.AVAILABLE],
      );
      if (existsRegister.rows.length === 0) {
        throw CustomError.notFound(
          'No se ha encontrado el registro deseado a actualizar',
        );
      }

      // search the same with other id
      const sameRegister = await this.pool.query<UserRoleDB>(
        `select
          cur.uro_id,
          cur.uro_record_status
        from
          core.core_user_role cur
        where
          cur.id_user = $1
          and cur.id_role = $2
          and cur.uro_id <> $3
          and cur.uro_record_status = $4;`,
        [id_user, id_role, id, RECORD_STATUS.AVAILABLE],
      );
      if (sameRegister.rows.length > 0) {
        throw CustomError.conflict(
          'Ya existe un registro con los datos a actualizar',
        );
      }

      // update
      const updated = await this.pool.query<UserRoleDB>(
        `update core.core_user_role
        set
          id_user = $1,
          id_role = $2
        where
          uro_id = $3
        returning
          *;`,
        [id_user, id_role, id],
      );
      return UserRoleMapper.entityFromObject(updated.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al actualizar');
    }
  }

  async get(getUserRoleDto: GetUserRoleDto): Promise<UserRole> {
    const { id } = getUserRoleDto;
    try {
      const findRegister = await this.pool.query<UserRoleDB>(
        `select
          cur.uro_id,
          cur.id_user,
          cur.id_role,
          cur.uro_created_date,
          cur.uro_record_status
        from
          core.core_user_role cur
        where
          cur.uro_id = $1
          and cur.uro_record_status = $2;`,
        [id, RECORD_STATUS.AVAILABLE],
      );
      if (findRegister.rows.length === 0) {
        throw CustomError.notFound(
          'No se ha encontrado el usuario por rol deseado',
        );
      }

      return UserRoleMapper.entityFromObject(findRegister.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al obtener');
    }
  }

  async getAll(getAllUsersRolesDto: GetAllUsersRolesDto): Promise<UserRole[]> {
    const { limit, offset } = getAllUsersRolesDto;
    try {
      const registers = await this.pool.query<UserRoleDB>(
        `select
          cur.uro_id ,
          cur.id_user ,
          cur.id_role ,
          cur.uro_created_date,
          cur.uro_record_status
        from
          core.core_user_role cur
        where
          cur.uro_record_status = $1
        order by
          cur.uro_id desc
        limit $2 offset $3;`,
        [RECORD_STATUS.AVAILABLE, limit, offset],
      );

      return UserRoleMapper.entitiesFromArray(registers.rows);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer(
        'Error en el Data Source al obtener todos',
      );
    }
  }

  async getAllDetail(
    getAllUsersRolesDto: GetAllUsersRolesDto,
  ): Promise<UserRoleDetail[]> {
    const { limit, offset } = getAllUsersRolesDto;
    try {
      const registers = await this.pool.query<UserRoleDetailDB>(
        `select
          cur.uro_id,
          cur.uro_created_date,
          cur.uro_record_status,
          cur.id_user,
          cur.id_role,
          cu.use_id,
          cu.use_name,
          cu.use_last_name,
          cu.use_email,
          '' as use_password,
          '' as use_token,
          cu.use_created_date,
          cu.use_record_status ,
          cr.rol_id,
          cr.rol_name,
          cr.rol_description,
          cr.rol_created_date,
          cr.rol_record_status
        from
          core.core_user_role cur
        join core.core_user cu on
          cur.id_user = cu.use_id
        join core.core_role cr on
          cur.id_role = cr.rol_id
          where cur.uro_record_status = $1
          order by cu.use_email
          limit $2 offset $3;`,
        [RECORD_STATUS.AVAILABLE, limit, offset],
      );

      return UserRoleMapper.entitiesFromArrayDetail(registers.rows);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer(
        'Error en el Data Source al obtener todos',
      );
    }
  }

  async delete(deleteUserRoleDto: DeleteUserRoleDto): Promise<UserRole> {
    const { id } = deleteUserRoleDto;
    try {
      // search if exists
      const findRegister = await this.pool.query<UserRoleDB>(
        `select
          cur.uro_id ,
          cur.uro_record_status
        from
          core.core_user_role cur
        where
          cur.uro_id = $1
          and cur.uro_record_status = $2;`,
        [id, RECORD_STATUS.AVAILABLE],
      );
      if (findRegister.rows.length === 0) {
        throw CustomError.notFound(
          'No se ha encontrado el usuario por rol deseado',
        );
      }

      // delete
      const deleted = await this.pool.query(
        `delete from core.core_user_role
        where
          uro_id = $1
        returning
          *;`,
        [id],
      );

      return UserRoleMapper.entityFromObject(deleted.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al eliminar');
    }
  }
}
