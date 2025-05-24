import { Pool } from 'pg';

import { PostgresDatabase } from '../../data';
import { CityDB } from '../../data/interfaces';
import { CustomError } from '../../domain/errors';
import { RECORD_STATUS } from '../../shared/constants';
import { CityDataSource } from '../../ports/data_sources';
import {
  CreateCityDto,
  GetAllCitiesDto,
  UpdateCityDto,
} from '../../domain/schemas/city';

export class CityDataSourceImpl implements CityDataSource {
  private pool: Pool;

  constructor() {
    this.pool = PostgresDatabase.getPool();
  }

  async getCityByNameAndProvince(
    name: string,
    id_province: number,
  ): Promise<CityDB | null> {
    try {
      const cityName = await this.pool.query<CityDB>(
        `select cc.cit_id, cc.cit_name, cc.cit_created_date, cc.cit_record_status, cc.id_province, cc.id_country 
        from core.core_city cc 
        where lower(cc.cit_name) = $1
          and cc.id_province = $2;`,
        [name, id_province],
      );

      return cityName.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);

      throw CustomError.internalServer(
        'Error en el Data Source al obtener ciudad',
      );
    }
  }

  async createCity(createCityDto: CreateCityDto): Promise<CityDB | null> {
    const { name, id_province, id_country } = createCityDto;

    try {
      const cityCreated = await this.pool.query<CityDB>(
        `insert into core.core_city (
            cit_name, id_province, id_country, cit_created_date, cit_record_status
          ) values ($1, $2, $3, $4, $5) returning *;`,
        [name, id_province, id_country, new Date(), RECORD_STATUS.AVAILABLE],
      );

      return cityCreated.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer(
        'Error en el Data Source al crear ciudad',
      );
    }
  }

  async getCityById(id: number): Promise<CityDB | null> {
    try {
      // search city
      const city = await this.pool.query<CityDB>(
        `select cc.cit_id, cc.cit_name, cc.cit_created_date, cc.cit_record_status, cc.id_province, cc.id_country 
        from core.core_city cc 
        where cc.cit_id = $1;`,
        [id],
      );

      return city.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer(
        'Error en el Data Source al obtener ciudad por id',
      );
    }
  }

  async getCityByNameIdAndProvince(
    id: number,
    name: string,
    id_province: number,
  ): Promise<CityDB | null> {
    try {
      const cityName = await this.pool.query<CityDB>(
        `select cc.cit_id, cc.cit_name, cc.cit_created_date, cc.cit_record_status, cc.id_province, cc.id_country 
        from core.core_city cc 
        where
          lower(cc.cit_name) = $1
          and cc.id_province = $2
          and cc.cit_id <> $3;`,
        [name, id_province, id],
      );

      return cityName.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer(
        'Error en el Data Source al obtener ciudad por id y provincia',
      );
    }
  }

  async updateCity(updateCityDto: UpdateCityDto): Promise<CityDB> {
    const { id, name, id_province, id_country } = updateCityDto;

    try {
      const updated = await this.pool.query<CityDB>(
        `update core.core_city
        set cit_name = $1, id_province = $2, id_country = $3
        where cit_id = $4 returning *;`,
        [name, id_province, id_country, id],
      );

      return updated.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer(
        'Error en el Data Source al actualizar ciudad',
      );
    }
  }

  async getAllCities(getAllCitiesDto: GetAllCitiesDto): Promise<CityDB[]> {
    const {
      limit = 50,
      offset = 0,
      id_province,
      id_country,
      filter,
    } = getAllCitiesDto;

    try {
      let query = `select cc.cit_id, cc.cit_name, cc.cit_created_date, 
      cc.cit_record_status, cc.id_province, cc.id_country 
      from core.core_city cc `;

      const conditions: string[] = [];
      const params: (string | number)[] = [];
      let paramIndex = 1;

      if (id_country) {
        conditions.push(`cc.id_country = $${paramIndex++}`);
        params.push(id_country);
      }

      if (id_province) {
        conditions.push(`cc.id_province = $${paramIndex++}`);
        params.push(id_province);
      }

      if (filter) {
        conditions.push(`(
        cc.cit_name ilike $${paramIndex}
      )`);
        params.push(`%${filter}%`);
        paramIndex++;
      }

      if (conditions.length > 0) {
        query += ` where ${conditions.join(' and ')}`;
      }

      query += ` order by cc.cit_name`;
      query += ` limit $${paramIndex++}`;
      params.push(limit);

      query += ` offset $${paramIndex++}`;
      params.push(offset);

      const result = await this.pool.query<CityDB>(query, params);
      return result.rows;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      console.error({ error });
      throw CustomError.internalServer(
        'Error en el data source al obtener ciudades',
      );
    }
  }

  async deleteCity(id: number): Promise<CityDB | null> {
    try {
      const deleted = await this.pool.query<CityDB>(
        `update core.core_city
        set cit_record_status = $1
        where cit_id = $2 returning *;`,
        [RECORD_STATUS.UNAVAILABLE, id],
      );

      return deleted.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer(
        'Error en el Data Source al eliminar ciudad',
      );
    }
  }
}
