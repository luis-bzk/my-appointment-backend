import { Pool } from 'pg';

import { PostgresDatabase } from '../../data';
import { RoleDB } from '../../data/interfaces';
import { CustomError } from '../../domain/errors';
import { RECORD_STATUS } from '../../shared/constants';
import { RoleDataSource } from '../../ports/data_sources';
import { CreateRoleDto, UpdateRoleDto } from '../../domain/schemas/role';
import { GetAllFiltersDto } from '../../domain/schemas/general';

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
        where lower(cr.rol_name) = $1;`,
        [name],
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
        where cr.rol_id = $1;`,
        [id],
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
        where lower(cr.rol_name) = $1 and cr.rol_id <> $2;`,
        [name, id],
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

  async getAllRoles(getAllRolesDto: GetAllFiltersDto): Promise<RoleDB[]> {
    const { limit = 50, offset = 0, filter } = getAllRolesDto;

    try {
      let query = `select cr.rol_id, cr.rol_name, cr.rol_description,
        cr.rol_created_date, cr.rol_record_status
        from core.core_role cr `;
      const params: any[] = [];
      let paramIndex = 1;

      if (filter) {
        query += `
          where (
            cr.rol_name ilike $${paramIndex} OR
            cr.rol_description ilike $${paramIndex}
          )
        `;
        params.push(`%${filter}%`);
        paramIndex++;
      }

      query += ` order by cr.rol_name`;

      query += ` limit $${paramIndex++}`;
      params.push(limit);

      query += ` offset $${paramIndex++}`;
      params.push(offset);

      const roles = await this.pool.query<RoleDB>(query, params);

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
      const updated = await this.pool.query<RoleDB>(
        `update core.core_role
        set rol_record_status = $1
        where rol_id = $2 and rol_record_status = $3 returning *;`,
        [RECORD_STATUS.UNAVAILABLE, id, RECORD_STATUS.AVAILABLE],
      );

      return updated.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el DataSource al obtener');
    }
  }

  async getRolesById(ids: number[]): Promise<RoleDB[]> {
    try {
      const placeholders = ids.map((_, i) => `$${i + 1}`).join(', ');

      const roles = await this.pool.query<RoleDB>(
        `select cr.rol_id, cr.rol_name, cr.rol_description, cr.rol_created_date, cr.rol_record_status
        from core.core_role cr where rol_id in (${placeholders})`,
        [...ids],
      );

      return roles.rows;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer(
        'Error en el Data Source al obtener los roles',
      );
    }
  }
}
