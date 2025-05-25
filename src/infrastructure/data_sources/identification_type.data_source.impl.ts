import { Pool } from 'pg';

import { PostgresDatabase } from '../../data';
import { CustomError } from '../../domain/errors';

import { IdentificationTypeDB } from '../../data/interfaces';
import { RECORD_STATUS } from '../../shared/constants';
import { IdentificationTypeDataSource } from '../../ports/data_sources';
import {
  CreateIdentTypeDto,
  GetAllIdentTypesDto,
  UpdateIdentTypeDto,
} from '../../domain/schemas/identification_type';

export class IdentificationTypeDataSourceImpl
  implements IdentificationTypeDataSource
{
  private pool: Pool;

  constructor() {
    this.pool = PostgresDatabase.getPool();
  }

  async getIdentTypeByName(name: string): Promise<IdentificationTypeDB | null> {
    try {
      const identTypeName = await this.pool.query<IdentificationTypeDB>(
        `select cit.ity_id, cit.ity_name, cit.ity_description, cit.ity_abbreviation, 
        cit.ity_created_date, cit.ity_record_status, cit.id_country 
         from core.core_identification_type cit
        where lower(cit.ity_name) = $1;`,
        [name],
      );

      return identTypeName.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer(
        'Error en el Data Source al obtener por nombre',
      );
    }
  }

  async createIdentType(
    createIdentTypeDto: CreateIdentTypeDto,
  ): Promise<IdentificationTypeDB | null> {
    const { name, description, abbreviation, id_country } = createIdentTypeDto;

    try {
      const identTypeCreated = await this.pool.query<IdentificationTypeDB>(
        `insert into core.core_identification_type (
            ity_name, ity_description, ity_abbreviation,
            id_country, ity_created_date, ity_record_status
          ) values ($1, $2, $3, $4, $5, $6) returning *;`,
        [
          name,
          description,
          abbreviation,
          id_country,
          new Date(),
          RECORD_STATUS.AVAILABLE,
        ],
      );

      return identTypeCreated.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al crear');
    }
  }

  async getIdentTypeById(id: number): Promise<IdentificationTypeDB | null> {
    try {
      const identType = await this.pool.query<IdentificationTypeDB>(
        `select cit.ity_id, cit.ity_name, cit.ity_description, cit.ity_abbreviation, 
        cit.ity_created_date, cit.ity_record_status, cit.id_country 
         from core.core_identification_type cit where cit.ity_id = $1;`,
        [id],
      );

      return identType.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer(
        'Error en el Data Source al obtener por id',
      );
    }
  }

  async getIdentTypeByNameAndCountry(
    name: string,
    id_country: number,
  ): Promise<IdentificationTypeDB | null> {
    try {
      const identType = await this.pool.query<IdentificationTypeDB>(
        `select cit.ity_id, cit.ity_name, cit.ity_description, cit.ity_abbreviation, 
        cit.ity_created_date, cit.ity_record_status, cit.id_country 
         from core.core_identification_type cit 
         where lower(cit.ity_name) = $1 and cit.id_country = $2;`,
        [name, id_country],
      );

      return identType.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer(
        'Error en el Data Source al obtener por id',
      );
    }
  }

  async getIdentTypeByNameIdAndCountry(
    id: number,
    name: string,
    id_country: number,
  ): Promise<IdentificationTypeDB | null> {
    try {
      const identTypeName = await this.pool.query<IdentificationTypeDB>(
        `select cit.ity_id, cit.ity_name, cit.ity_description, cit.ity_abbreviation, 
        cit.ity_created_date, cit.ity_record_status, cit.id_country 
         from core.core_identification_type cit 
        where lower(cit.ity_name) = $1 and cit.ity_id <> $2 and cit.id_country <> $3;`,
        [name, id, id_country],
      );

      return identTypeName.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al actualizar');
    }
  }

  async updateIdentType(
    updateIdentTypeDto: UpdateIdentTypeDto,
  ): Promise<IdentificationTypeDB | null> {
    const { id, name, description, abbreviation, id_country } =
      updateIdentTypeDto;

    try {
      const updatedRegister = await this.pool.query<IdentificationTypeDB>(
        `update core.core_identification_type
        set ity_name = $1, ity_description = $2, ity_abbreviation = $3, id_country = $4
        where ity_id = $5 returning *;`,
        [name, description, abbreviation, id_country, id],
      );
      return updatedRegister.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al actualizar');
    }
  }

  async getAllIdentTypes(
    getAllIdentTypesDto: GetAllIdentTypesDto,
  ): Promise<IdentificationTypeDB[]> {
    const { id_country } = getAllIdentTypesDto;
    try {
      let query = `select cit.ity_id, cit.ity_name, cit.ity_description, cit.ity_abbreviation, 
        cit.ity_created_date, cit.ity_record_status, cit.id_country 
         from core.core_identification_type cit `;

      const conditions: string[] = [];
      const params: (string | number)[] = [];

      if (id_country) {
        conditions.push(`cit.id_country = $1 `);
        params.push(id_country);
      }

      if (conditions.length > 0) {
        query += ` where ${conditions.join(' and ')} `;
      }

      query += ` order by cit.ity_name`;

      const registers = await this.pool.query<IdentificationTypeDB>(
        query,
        params,
      );

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

  async deleteIdentType(id: number): Promise<IdentificationTypeDB | null> {
    try {
      const deletedRegister = await this.pool.query<IdentificationTypeDB>(
        `update core.core_identification_type
        set ity_record_status = $1
        where ity_id = $2 returning *;`,
        [RECORD_STATUS.UNAVAILABLE, id],
      );
      return deletedRegister.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al borrar');
    }
  }
}
