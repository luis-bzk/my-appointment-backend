import { Pool } from 'pg';

import { PostgresDatabase } from '../../data';
import { CountryDB } from '../../data/interfaces';
import { CustomError } from '../../domain/errors';
import { RECORD_STATUS } from '../../shared/constants';
import { CountryDataSource } from '../../ports/data_sources';
import {
  CreateCountryDto,
  UpdateCountryDto,
} from '../../domain/schemas/country';
import { GetAllFiltersDto } from '../../domain/schemas/general';

export class CountryDataSourceImpl implements CountryDataSource {
  private pool: Pool;

  constructor() {
    this.pool = PostgresDatabase.getPool();
  }

  async getCountryByName(name: string): Promise<CountryDB | null> {
    try {
      const result = await this.pool.query<CountryDB>(
        `select cou_id, cou_name, cou_code, cou_prefix,
          cou_created_date, cou_record_status
        from core.core_country cou where lower(cou.cou_name) = $1;`,
        [name],
      );

      return result.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al crear');
    }
  }

  async createCountry(
    createCountryDto: CreateCountryDto,
  ): Promise<CountryDB | null> {
    const { name, prefix, code } = createCountryDto;

    try {
      const countryCreated = await this.pool.query<CountryDB>(
        `insert into core.core_country (
          cou_name, cou_code, cou_prefix, cou_created_date, cou_record_status
        ) values ($1, $2, $3, $4, $5) returning *;`,
        [name, code, prefix, new Date(), RECORD_STATUS.AVAILABLE],
      );

      return countryCreated.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al crear');
    }
  }

  async getCountryById(id: number): Promise<CountryDB | null> {
    try {
      const result = await this.pool.query<CountryDB>(
        `select cou_id, cou_name, cou_code, cou_prefix,
          cou_created_date, cou_record_status
        from core.core_country cou where cou.cou_id = $1;`,
        [id],
      );

      return result.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al actualizar');
    }
  }

  async getCountryByNameId(
    id: number,
    name: string,
  ): Promise<CountryDB | null> {
    try {
      const rowSameName = await this.pool.query<CountryDB>(
        `select cou_id, cou_name, cou_code, cou_prefix,
          cou_created_date, cou_record_status
        from core.core_country cou
        where lower(cou.cou_name) = $1 and cou.cou_id <> $2 
        and cou.cou_record_status = $3;`,
        [name, id, RECORD_STATUS.AVAILABLE],
      );

      return rowSameName.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al actualizar');
    }
  }

  async updateCountry(
    updateCountryDto: UpdateCountryDto,
  ): Promise<CountryDB | null> {
    const { id, name, code, prefix } = updateCountryDto;

    try {
      const updatedRow = await this.pool.query<CountryDB>(
        `update core.core_country
        set cou_name = $1, cou_code = $2, cou_prefix = $3
        where cou_id = $4 returning *;`,
        [name, code, prefix, id],
      );

      return updatedRow.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al actualizar');
    }
  }

  async getAllCountries(
    getAllCountriesDto: GetAllFiltersDto,
  ): Promise<CountryDB[]> {
    const { limit = 50, offset, filter } = getAllCountriesDto;

    console.log({ limit, offset, filter });

    try {
      let query = `
      select cou.cou_id, cou.cou_name, cou.cou_code, cou.cou_prefix,
             cou.cou_created_date, cou.cou_record_status
      from core.core_country cou`;

      const params: any[] = [];
      let paramIndex = 1;

      if (filter) {
        query += `
        where (
          cou.cou_name ilike $${paramIndex} or
          cou.cou_code ilike $${paramIndex} or
          cou.cou_prefix ilike $${paramIndex}
        )`;
        params.push(`%${filter}%`);
        paramIndex++;
      }

      query += ` order by cou.cou_name`;

      query += ` limit $${paramIndex++}`;
      params.push(limit);

      if (offset) {
        query += ` offset $${paramIndex++}`;
        params.push(offset);
      }

      const result = await this.pool.query<CountryDB>(query, params);
      return result.rows;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      console.log({ error });

      throw CustomError.internalServer(
        'Error en el Data Source al obtener países',
      );
    }
  }

  async deleteCountry(id: number): Promise<CountryDB | null> {
    try {
      const countryUpdated = await this.pool.query<CountryDB>(
        `update core.core_country
        set cou_record_status = $1
        where cou_id = $2 returning *;`,
        [RECORD_STATUS.UNAVAILABLE, id],
      );

      return countryUpdated.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al eliminar');
    }
  }
}
