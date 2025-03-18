import { Pool } from 'pg';

import {
  CreateRoleDto,
  DeleteRoleDto,
  GetAllRolesDto,
  GetRoleDto,
  UpdateRoleDto,
} from '../../domain/dtos/role';
import { Role } from '../../domain/entities';
import { PostgresDatabase } from '../../data';
import { RoleDB } from '../../data/interfaces';
import { CustomError } from '../../domain/errors';
import { RoleMapper } from '../mappers/role.mapper';
import { RECORD_STATUS } from '../../shared/constants';
import { RoleDataSource } from '../../domain/data_sources';

export class RoleDataSourceImpl implements RoleDataSource {
  private pool: Pool;

  constructor() {
    this.pool = PostgresDatabase.getPool();
  }

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const { name, description } = createRoleDto;

    try {
      const roleName = await this.pool.query<RoleDB>(
        `select
          cr.rol_id,
          cr.rol_record_status
        from
          core.core_role cr
        where
          lower(cr.rol_name) = $1
          and cr.rol_record_status = $2;`,
        [name, RECORD_STATUS.AVAILABLE],
      );
      if (roleName.rows.length > 0) {
        throw CustomError.conflict('Ya existe un rol con el nombre ingresado');
      }

      const newRole = await this.pool.query<RoleDB>(
        `insert into
          core.core_role (
            rol_name,
            rol_description,
            rol_created_date,
            rol_record_status
          )
        values
          ($1, $2, $3, $4)
        returning
          *;`,
        [name, description, new Date(), RECORD_STATUS.AVAILABLE],
      );
      return RoleMapper.entityFromObject(newRole.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el DataSource al crear');
    }
  }

  async update(updateRoleDto: UpdateRoleDto): Promise<Role> {
    const { id, name, description } = updateRoleDto;

    try {
      // exists
      const roleFound = await this.pool.query<RoleDB>(
        `select
          cr.rol_id,
          cr.rol_record_status
        from
          core.core_role cr
        where
          cr.rol_id = $1
          and cr.rol_record_status = $2;`,
        [id, RECORD_STATUS.AVAILABLE],
      );
      if (roleFound.rows.length === 0) {
        throw CustomError.notFound('No se ha encontrado el rol a actualizar');
      }

      // other role same name
      const roleName = await this.pool.query<RoleDB>(
        `select
          cr.rol_id,
          cr.rol_record_status
        from
          core.core_role cr
        where
          lower(cr.rol_name) = $1
          and cr.rol_id <> $2
          and cr.rol_record_status = $3;`,
        [name, id, RECORD_STATUS.AVAILABLE],
      );
      if (roleName.rows.length > 0) {
        throw CustomError.conflict(
          'Ya existe un rol diferente con el nombre ingresado',
        );
      }

      // update
      const updated = await this.pool.query<RoleDB>(
        `update core.core_role
        set
          rol_name = $1,
          rol_description = $2
        where
          rol_id = $3
        returning
          *;`,
        [name, description, id],
      );

      return RoleMapper.entityFromObject(updated.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el DataSource al actualizar');
    }
  }

  async get(getRoleDto: GetRoleDto): Promise<Role> {
    const { id } = getRoleDto;

    try {
      // exists
      const roleFound = await this.pool.query<RoleDB>(
        `select
          cr.rol_id,
          cr.rol_name,
          cr.rol_description,
          cr.rol_created_date,
          cr.rol_record_status
        from
          core.core_role cr
        where
          cr.rol_id = $1
          and cr.rol_record_status = $2;`,
        [id, RECORD_STATUS.AVAILABLE],
      );
      if (roleFound.rows.length === 0) {
        throw CustomError.notFound('No se ha encontrado el rol a actualizar');
      }

      return RoleMapper.entityFromObject(roleFound.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el DataSource al obtener');
    }
  }

  async getAll(getAllRolesDto: GetAllRolesDto): Promise<Role[]> {
    const { limit, offset } = getAllRolesDto;
    try {
      const roles = await this.pool.query<RoleDB>(
        `select
          cr.rol_id,
          cr.rol_name,
          cr.rol_description,
          cr.rol_created_date,
          cr.rol_record_status
        from
          core.core_role cr
        where
          cr.rol_record_status = $1
        order by
          cr.rol_name
        limit $2 offset $3;`,
        [RECORD_STATUS.AVAILABLE, limit, offset],
      );

      return RoleMapper.entitiesFromArray(roles.rows);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer(
        'Error en el DataSource al obtener todos',
      );
    }
  }

  async delete(deleteRoleDto: DeleteRoleDto): Promise<Role> {
    const { id } = deleteRoleDto;
    try {
      // exists
      const roleFound = await this.pool.query<RoleDB>(
        `select
          cr.rol_id,
          cr.rol_record_status
        from
          core.core_role cr
        where
          cr.rol_id = $1
          and cr.rol_record_status = $2;`,
        [id, RECORD_STATUS.AVAILABLE],
      );
      if (roleFound.rows.length === 0) {
        throw CustomError.notFound('No se ha encontrado el rol a eliminar');
      }

      const deletedRole = await this.pool.query(
        `delete from core.core_role
        where
          rol_id = $1
        returning
          *;`,
        [id],
      );

      return RoleMapper.entityFromObject(deletedRole.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el DataSource al obtener');
    }
  }
}
