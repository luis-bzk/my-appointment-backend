import { Pool } from 'pg';

import { PostgresDatabase } from '../../data';
import { CustomError } from '../../domain/errors';
import { PhoneTypeDB } from '../../data/interfaces';
import { RECORD_STATUS } from '../../shared/constants';
import { PhoneTypeDataSource } from '../../ports/data_sources';
import {
  CreatePhoneTypeDto,
  UpdatePhoneTypeDto,
} from '../../domain/schemas/phone_type';
import { GetAllFiltersDto } from '../../domain/schemas/general';

export class PhoneTypeDataSourceImpl implements PhoneTypeDataSource {
  private pool: Pool;

  constructor() {
    this.pool = PostgresDatabase.getPool();
  }

  async getPhoneTypeByName(name: string): Promise<PhoneTypeDB | null> {
    try {
      const phoneTypeName = await this.pool.query<PhoneTypeDB>(
        `select cpt.pty_id, cpt.pty_name, cpt.pty_description, 
        cpt.pty_created_date, cpt.pty_record_status 
        from core.core_phone_type cpt
        where lower(cpt.pty_name) = $1;`,
        [name],
      );

      return phoneTypeName.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer(
        'Error en el Data Source al obtener por nombre',
      );
    }
  }

  async createPhoneType(
    createPhoneTypeDto: CreatePhoneTypeDto,
  ): Promise<PhoneTypeDB | null> {
    const { name, description } = createPhoneTypeDto;
    try {
      const newPhoneType = await this.pool.query<PhoneTypeDB>(
        `insert into core.core_phone_type (
        pty_name, pty_description, pty_created_date, pty_record_status
        ) values ($1, $2, $3, $4) returning *;`,
        [name, description, new Date(), RECORD_STATUS.AVAILABLE],
      );

      return newPhoneType.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al crear');
    }
  }

  async getPhoneTypeById(id: number): Promise<PhoneTypeDB | null> {
    try {
      const phoneType = await this.pool.query<PhoneTypeDB>(
        `select cpt.pty_id, cpt.pty_name, cpt.pty_description, 
        cpt.pty_created_date, cpt.pty_record_status 
        from core.core_phone_type cpt
        where cpt.pty_id = $1;`,
        [id],
      );
      return phoneType.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer(
        'Error en el Data Source al obtener por id',
      );
    }
  }

  async getPhoneTypeByNameId(
    id: number,
    name: string,
  ): Promise<PhoneTypeDB | null> {
    try {
      const phoneTypeName = await this.pool.query<PhoneTypeDB>(
        `select cpt.pty_id, cpt.pty_name, cpt.pty_description, 
        cpt.pty_created_date, cpt.pty_record_status 
        from core.core_phone_type cpt
        where lower(cpt.pty_name) = $1 and cpt.pty_id <> $2;`,
        [name, id],
      );

      return phoneTypeName.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer(
        'Error en el Data Source al obtener por nombre e id',
      );
    }
  }

  async updatePhoneType(
    updatePhoneTypeDto: UpdatePhoneTypeDto,
  ): Promise<PhoneTypeDB | null> {
    const { id, name, description } = updatePhoneTypeDto;
    try {
      const phoneTypeUpdated = await this.pool.query<PhoneTypeDB>(
        `update core.core_phone_type
        set pty_name = $1, pty_description = $2
        where pty_id = $3 returning *;`,
        [name, description, id],
      );

      return phoneTypeUpdated.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al actualizar');
    }
  }

  async getAllPhoneTypes(dto: GetAllFiltersDto): Promise<PhoneTypeDB[]> {
    const { limit = 50, offset = 0 } = dto;
    try {
      let query = `select cpt.pty_id, cpt.pty_name, cpt.pty_description, 
      cpt.pty_created_date, cpt.pty_record_status 
      from core.core_phone_type cpt `;

      const params: any[] = [];
      let paramIndex = 1;

      query += ` order by cpt.pty_name `;

      query += ` limit $${paramIndex++}`;
      params.push(limit);

      query += ` offset $${paramIndex++}`;
      params.push(offset);

      const registers = await this.pool.query<PhoneTypeDB>(query, params);

      return registers.rows;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer(
        'Error en el Data Source al obtener los tipos de teléfono',
      );
    }
  }

  async deletePhoneType(id: number): Promise<PhoneTypeDB | null> {
    try {
      const phoneTypeDeleted = await this.pool.query<PhoneTypeDB>(
        `update core.core_phone_type
        set pty_record_status = $1
        where pty_id = $2 returning *;`,
        [RECORD_STATUS.UNAVAILABLE, id],
      );

      return phoneTypeDeleted.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al crear');
    }
  }
}
