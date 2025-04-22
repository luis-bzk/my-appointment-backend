import { Pool } from 'pg';

import {
  CreateRoleDto,
  GetAllRolesDto,
  UpdateRoleDto,
} from '../../domain/dtos/role';
import { PostgresDatabase } from '../../data';
import { RoleDB } from '../../data/interfaces';
import { CustomError } from '../../domain/errors';
import { RECORD_STATUS } from '../../shared/constants';
import { RoleDataSource } from '../../adapters/data_sources';

export class RoleDataSourceImpl implements RoleDataSource {
  private pool: Pool;

  constructor() {
    this.pool = PostgresDatabase.getPool();
  }

  async findRoleByName(name: string): Promise<RoleDB> {
    try {
      const role = await this.pool.query<RoleDB>(
        `select cr.rol_id, cr.rol_name, cr.rol_description,
          cr.rol_created_date,cr.rol_record_status
        from core.core_role cr
        where lower(cr.rol_name) = $1 and cr.rol_record_status = $2;`,
        [name, RECORD_STATUS.AVAILABLE],
      );

      return role.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el DataSource al crear');
    }
  }

  async createRole(createRoleDto: CreateRoleDto): Promise<RoleDB> {
    const { name, description } = createRoleDto;

    try {
      const newRole = await this.pool.query<RoleDB>(
        `insert into core.core_role (
            rol_name, rol_description, rol_created_date, rol_record_status
          ) values ($1, $2, $3, $4) returning *;`,
        [name, description, new Date(), RECORD_STATUS.AVAILABLE],
      );
      return newRole.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el DataSource al crear');
    }
  }

  async findRoleById(id: number): Promise<RoleDB> {
    try {
      const role = await this.pool.query<RoleDB>(
        `select cr.rol_id, cr.rol_name, cr.rol_description,
          cr.rol_created_date,cr.rol_record_status
        from core.core_role cr
        where cr.rol_id = $1 and cr.rol_record_status = $2;`,
        [id, RECORD_STATUS.AVAILABLE],
      );
      return role.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el DataSource al actualizar');
    }
  }

  async findRoleByNameId(id: number, name: string): Promise<RoleDB> {
    try {
      const role = await this.pool.query<RoleDB>(
        `select cr.rol_id, cr.rol_name, cr.rol_description,
          cr.rol_created_date, cr.rol_record_status
        from core.core_role cr
        where lower(cr.rol_name) = $1 and cr.rol_id <> $2 and cr.rol_record_status = $3;`,
        [name, id, RECORD_STATUS.AVAILABLE],
      );
      return role.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el DataSource al actualizar');
    }
  }

  async updateRole(updateRoleDto: UpdateRoleDto): Promise<RoleDB> {
    const { id, name, description } = updateRoleDto;

    try {
      const updated = await this.pool.query<RoleDB>(
        `update core.core_role
        set rol_name = $1, rol_description = $2
        where rol_id = $3 returning *;`,
        [name, description, id],
      );

      return updated.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el DataSource al actualizar');
    }
  }

  async getAllRoles(getAllRolesDto: GetAllRolesDto): Promise<RoleDB[]> {
    const { limit, offset } = getAllRolesDto;
    try {
      const roles = await this.pool.query<RoleDB>(
        `select cr.rol_id, cr.rol_name, cr.rol_description,
          cr.rol_created_date, cr.rol_record_status
        from core.core_role cr
        where cr.rol_record_status = $1 order by cr.rol_name limit $2 offset $3;`,
        [RECORD_STATUS.AVAILABLE, limit, offset],
      );

      return roles.rows;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer(
        'Error en el DataSource al obtener todos',
      );
    }
  }

  async deleteRole(id: number): Promise<RoleDB> {
    try {
      const deletedRole = await this.pool.query(
        `delete from core.core_role
        where rol_id = $1 returning *;`,
        [id],
      );

      return deletedRole.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el DataSource al obtener');
    }
  }
}
