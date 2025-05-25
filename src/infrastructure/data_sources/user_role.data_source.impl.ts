import { Pool } from 'pg';

import { PostgresDatabase } from '../../data';
import { CustomError } from '../../domain/errors';
import { RECORD_STATUS } from '../../shared/constants';
import { UserRoleDataSource } from '../../ports/data_sources';
import { TotalQueryDB, UserRoleDB } from '../../data/interfaces';
import {
  CreateUserRoleDto,
  UpdateUserRoleDto,
} from '../../domain/schemas/user_role';
import { GetAllFiltersDto } from '../../domain/schemas/general';

export class UserRoleDataSourceImpl implements UserRoleDataSource {
  private pool: Pool;

  constructor() {
    this.pool = PostgresDatabase.getPool();
  }

  async findUserRole(
    createUserRoleDto: CreateUserRoleDto,
  ): Promise<UserRoleDB> {
    const { id_user, id_role } = createUserRoleDto;
    try {
      // search if user role exists
      const existsRegister = await this.pool.query<UserRoleDB>(
        `select cur.uro_id, cur.uro_created_date, cur.uro_record_status,
        cur.id_user, cur.id_role
        from core.core_user_role cur
        where cur.id_user = $1 and cur.id_role = $2;`,
        [id_user, id_role],
      );

      return existsRegister.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al crear');
    }
  }

  async createUserRole(
    createUserRoleDto: CreateUserRoleDto,
  ): Promise<UserRoleDB> {
    const { id_user, id_role } = createUserRoleDto;
    try {
      const createdRegister = await this.pool.query<UserRoleDB>(
        `insert into
          core.core_user_role (
            id_user, id_role, uro_created_date, uro_record_status
          ) values ($1, $2, $3, $4) returning *;`,
        [id_user, id_role, new Date(), RECORD_STATUS.AVAILABLE],
      );

      return createdRegister.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al crear');
    }
  }

  async findUserRoleId(id: number): Promise<UserRoleDB> {
    try {
      const existsRegister = await this.pool.query<UserRoleDB>(
        `select cur.uro_id, cur.uro_created_date, cur.uro_record_status,
        cur.id_user, cur.id_role
        from core.core_user_role cur
        where cur.uro_id = $1;`,
        [id],
      );
      return existsRegister.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al actualizar');
    }
  }

  async findUserRoleSameRegister(
    updateUserRoleDto: UpdateUserRoleDto,
  ): Promise<UserRoleDB> {
    const { id, id_role, id_user } = updateUserRoleDto;

    try {
      const sameRegister = await this.pool.query<UserRoleDB>(
        `select cur.uro_id, cur.uro_created_date, cur.uro_record_status,
        cur.id_user, cur.id_role
        from core.core_user_role cur
        where cur.id_user = $1 and cur.id_role = $2
          and cur.uro_id <> $3;`,
        [id_user, id_role, id],
      );

      return sameRegister.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al actualizar');
    }
  }

  async updateUserRole(
    updateUserRoleDto: UpdateUserRoleDto,
  ): Promise<UserRoleDB> {
    const { id, id_role, id_user } = updateUserRoleDto;

    try {
      const updated = await this.pool.query<UserRoleDB>(
        `update core.core_user_role
        set id_user = $1, id_role = $2
        where uro_id = $3 returning *;`,
        [id_user, id_role, id, RECORD_STATUS.AVAILABLE],
      );
      return updated.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al actualizar');
    }
  }

  async getAllUserRoles(
    getAllUsersRolesDto: GetAllFiltersDto,
  ): Promise<UserRoleDB[]> {
    const { limit = 50, offset = 0 } = getAllUsersRolesDto;

    try {
      let query = `select cur.uro_id, cur.uro_created_date, cur.uro_record_status,
              cur.id_user, cur.id_role
              from core.core_user_role cur
              order by cur.uro_id desc `;
      const params: any[] = [];
      let paramIndex = 1;

      query += ` limit $${paramIndex++}`;
      params.push(limit);

      query += ` offset $${paramIndex++}`;
      params.push(offset);

      const registers = await this.pool.query<UserRoleDB>(query, params);

      return registers.rows;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer(
        'Error en el Data Source al obtener todos',
      );
    }
  }

  async deleteUserRole(id: number): Promise<UserRoleDB> {
    try {
      const updated = await this.pool.query<UserRoleDB>(
        `update core.core_user_role
        set uro_record_status = $1
        where uro_id = $2 and uro_record_status = $3 returning *;`,
        [RECORD_STATUS.UNAVAILABLE, id, RECORD_STATUS.AVAILABLE],
      );
      return updated.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al eliminar');
    }
  }

  async countAvailableRegisters(): Promise<TotalQueryDB | null> {
    try {
      const registersFound = await this.pool.query<TotalQueryDB>(
        `select count(cur.uro_id) as total  from core.core_user_role cur;`,
        [],
      );

      return registersFound.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al obtener');
    }
  }
}
