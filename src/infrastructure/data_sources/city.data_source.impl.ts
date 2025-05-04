import { Pool } from 'pg';

import {
  CreateCityDto,
  DeleteCityDto,
  GetAllCitiesDto,
  GetCityDto,
  UpdateCityDto,
} from '../../domain/dtos/city';
import { City } from '../../domain/entities';
import { PostgresDatabase } from '../../data';
import { CityDB } from '../../data/interfaces';
import { CustomError } from '../../domain/errors';
import { CityMapper } from '../mappers/city.mapper';
import { RECORD_STATUS } from '../../shared/constants';
import { CityDataSource } from '../../ports/data_sources';

export class CityDataSourceImpl implements CityDataSource {
  private pool: Pool;

  constructor() {
    this.pool = PostgresDatabase.getPool();
  }

  async create(createCityDto: CreateCityDto): Promise<City> {
    const { name, id_province, id_country } = createCityDto;

    try {
      // search city with the same name
      const cityName = await this.pool.query<CityDB>(
        `select
          cit.cit_id,
          cit.cit_record_status
        from
          core.core_city cit
        where
          lower(cit.cit_name) = $1
          and cit.id_province = $2
          and cit.cit_record_status = $3;`,
        [name, id_province, RECORD_STATUS.AVAILABLE],
      );
      if (cityName.rows.length > 0) {
        throw CustomError.conflict('Ya existe una ciudad con el mismo nombre');
      }

      // create city
      const cityCreated = await this.pool.query<CityDB>(
        `insert into
          core.core_city (
            cit_name,
            id_province,
            id_country,
            cit_created_date,
            cit_record_status
          )
        values
          ($1, $2, $3, $4) returning *;`,
        [name, id_province, id_country, new Date(), RECORD_STATUS.AVAILABLE],
      );

      return CityMapper.entityFromObject(cityCreated.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al crear');
    }
  }

  async update(updateCityDto: UpdateCityDto): Promise<City> {
    const { id, name, id_province, id_country } = updateCityDto;

    try {
      // search city
      const city = await this.pool.query<CityDB>(
        `select
          cit.cit_id,
          cit.cit_record_status
        from
          core.core_city cit
        where
          cit.cit_id = $1
          and cit.cit_record_status = $2;`,
        [id, RECORD_STATUS.AVAILABLE],
      );
      if (city.rows.length === 0) {
        throw CustomError.notFound(
          'No se ha encontrado la ciudad a actualizar',
        );
      }

      // search city with the same name
      const cityName = await this.pool.query<CityDB>(
        `select
          cit.cit_id,
          cit.cit_name,
          cit.cit_record_status
        from
          core.core_city cit
        where
          lower(cit.cit_name) = $1
          and cit.id_province = $2
          and cit.cit_id <> $3
          and cit.cit_record_status = $4;`,
        [name, id_province, id, RECORD_STATUS.AVAILABLE],
      );
      if (cityName.rows.length > 0) {
        throw CustomError.conflict(
          'Ya existe una ciudad con el nombre ingresado',
        );
      }

      // update city
      const updated = await this.pool.query<CityDB>(
        `update core.core_city
        set
          cit_name = $1,
          id_province = $2,
          id_country = $3
        where
          cit_id = $4 returning *;`,
        [name, id_province, id_country, id],
      );

      return CityMapper.entityFromObject(updated.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al actualizar');
    }
  }

  async get(getCityDto: GetCityDto): Promise<City> {
    const { id } = getCityDto;

    try {
      const result = await this.pool.query<CityDB>(
        `select
          cit.cit_id,
          cit.cit_name,
          cit.id_province,
          cit.id_country,
          cit.cit_created_date,
          cit.cit_record_status
        from
          core.core_city cit
        where
          cit.cit_id = $1
          and cit.cit_record_status = $2;`,
        [id, RECORD_STATUS.AVAILABLE],
      );
      if (result.rows.length === 0) {
        throw CustomError.notFound('No se ha encontrado la ciudad');
      }

      return CityMapper.entityFromObject(result.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer('Error en el Data Source al obtener');
    }
  }

  async getAll(getAllCitiesDto: GetAllCitiesDto): Promise<City[]> {
    const { limit, offset, id_province } = getAllCitiesDto;

    const params: (string | number)[] = [
      RECORD_STATUS.AVAILABLE,
      limit,
      offset,
    ];

    let query = `select cit.cit_id,
          cit.cit_name,
          cit.id_province,
          cit.id_country,
          cit.cit_created_date,
          cit.cit_record_status
    from core.core_city cit `;

    if (id_province) {
      query += ` join core.core_province pro on cit.id_province = pro.pro_id`;
    }

    query += ` where cit.cit_record_status = $1`;

    if (id_province) {
      query += ` and pro.pro_id = $2
      order by cit.cit_name limit $3 offset $4;`;
      params.splice(1, 0, id_province);
    } else {
      query += ' order by cit.cit_name limit $2 offset $3;';
    }

    try {
      const result = await this.pool.query<CityDB>(query, params);

      return CityMapper.entitiesFromArray(result.rows);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer(
        'Error en el Data Source al obtener todos',
      );
    }
  }

  async delete(deleteCityDto: DeleteCityDto): Promise<City> {
    const { id } = deleteCityDto;

    try {
      const result = await this.pool.query<CityDB>(
        `select
          cit.cit_id,
          cit.cit_name,
          cit.id_province,
          cit.id_country,
          cit.cit_created_date,
          cit.cit_record_status
        from
          core.core_city cit
        where
          cit.cit_id = $1
          and cit.cit_record_status = $2;`,
        [id, RECORD_STATUS.AVAILABLE],
      );
      if (result.rows.length === 0) {
        throw CustomError.notFound('No se ha encontrado la ciudad a eliminar');
      }

      const deleted = await this.pool.query<CityDB>(
        `delete from core.core_city
        where
          cit_id = $1
          and cit_record_status = $2 returning *;`,
        [id, RECORD_STATUS.AVAILABLE],
      );

      return CityMapper.entityFromObject(deleted.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al eliminar');
    }
  }
}
