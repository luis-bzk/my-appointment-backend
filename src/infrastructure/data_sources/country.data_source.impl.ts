import { Pool } from 'pg';

import {
  CreateCountryDto,
  DeleteCountryDto,
  GetAllCountriesDto,
  GetCountryDto,
  UpdateCountryDto,
} from '../../domain/dtos/country';
import { PostgresDatabase } from '../../data';
import { Country } from '../../domain/entities';
import { CountryDB } from '../../data/interfaces';
import { CustomError } from '../../domain/errors';
import { RECORD_STATUS } from '../../shared/constants';
import { CountryMapper } from '../mappers/country.mapper';
import { CountryDataSource } from '../../adapters/data_sources';

export class CountryDataSourceImpl implements CountryDataSource {
  private pool: Pool;

  constructor() {
    this.pool = PostgresDatabase.getPool();
  }

  async create(createCountryDto: CreateCountryDto): Promise<Country> {
    const { name, prefix, code } = createCountryDto;

    try {
      // country with name
      const result = await this.pool.query<CountryDB>(
        `select
          cou_id,
          cou_record_status
        from
          core.core_country cou
        where
          lower(cou.cou_name) = $1
          and cou.cou_record_status = $2;`,
        [name, RECORD_STATUS.AVAILABLE],
      );

      if (result.rows.length > 0) {
        throw CustomError.conflict(
          'Ya existe un país registrado con ese nombre',
        );
      }

      // create country
      const countryCreated = await this.pool.query<CountryDB>(
        `insert into
        core.core_country (
          cou_name,
          cou_code,
          cou_prefix,
          cou_created_date,
          cou_record_status
        )
      values
        ($1, $2, $3, $4, $5) returning *;`,
        [name, code, prefix, new Date(), RECORD_STATUS.AVAILABLE],
      );

      return CountryMapper.entityFromObject(countryCreated.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al crear');
    }
  }

  async update(updateCountryDto: UpdateCountryDto): Promise<Country> {
    const { id, name, code, prefix } = updateCountryDto;

    try {
      // verify existence
      const result = await this.pool.query<CountryDB>(
        `select
          cou_id,
          cou_record_status
        from
          core.core_country cou
        where
          cou.cou_id = $1
          and cou.cou_record_status = $2;`,
        [id, RECORD_STATUS.AVAILABLE],
      );
      if (result.rows.length === 0) {
        throw CustomError.notFound('No se ha encontrado el país a actualizar');
      }

      // verify if there's a country with the same name
      const rowSameName = await this.pool.query<CountryDB>(
        `select
          cou_id,
          cou_record_status
        from
          core.core_country cou
        where
          lower(cou.cou_name) = $1
          and cou.cou_id <> $2
          and cou.cou_record_status = $3;`,
        [name, id, RECORD_STATUS.AVAILABLE],
      );
      if (rowSameName.rows.length > 0) {
        throw CustomError.conflict('Ya existe un país con el nombre ingresado');
      }

      // update
      const updatedRow = await this.pool.query<CountryDB>(
        `update core.core_country
        set
          cou_name = $1,
          cou_code = $2,
          cou_prefix = $3
        where
          cou_id = $4
          and cou_record_status = $5 returning *;`,
        [name, code, prefix, id, RECORD_STATUS.AVAILABLE],
      );

      return CountryMapper.entityFromObject(updatedRow.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al actualizar');
    }
  }

  async get(getCountryDto: GetCountryDto): Promise<Country> {
    const { id } = getCountryDto;

    try {
      const result = await this.pool.query<CountryDB>(
        `select
          cou_id,
          cou_name,
          cou_code,
          cou_prefix,
          cou_created_date,
          cou_record_status
        from
          core.core_country cou
        where
          cou.cou_id = $1
          and cou.cou_record_status = $2;`,
        [id, RECORD_STATUS.AVAILABLE],
      );

      if (result.rows.length === 0) {
        throw CustomError.notFound('No se ha encontrado el país');
      }

      return CountryMapper.entityFromObject(result.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al obtener');
    }
  }

  async getAll(getAllCountriesDto: GetAllCountriesDto): Promise<Country[]> {
    const { limit, offset } = getAllCountriesDto;

    try {
      const result = await this.pool.query<CountryDB>(
        `select
          cou_id,
          cou_name,
          cou_code,
          cou_prefix,
          cou_created_date,
          cou_record_status
        from
          core.core_country cou
        where
          cou.cou_record_status = $1
        order by
          cou.cou_name
        limit $2 offset $3;`,
        [RECORD_STATUS.AVAILABLE, limit, offset],
      );

      return CountryMapper.entitiesFromArray(result.rows);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer(
        'Error en el Data Source al obtener todos',
      );
    }
  }

  async delete(deleteCountryDto: DeleteCountryDto): Promise<Country> {
    const { id } = deleteCountryDto;

    try {
      const result = await this.pool.query<CountryDB>(
        `select
          cou_id,
          cou_record_status
        from
          core.core_country cou
        where
          cou.cou_id = $1
          and cou.cou_record_status = $2;`,
        [id, RECORD_STATUS.AVAILABLE],
      );
      if (result.rows.length === 0) {
        throw CustomError.notFound('No se ha encontrado el país a eliminar');
      }

      const deleted = await this.pool.query<CountryDB>(
        `delete from core.core_country cou
        where
          cou.cou_id = $1
          and cou.cou_record_status = $2 returning *;`,
        [id, RECORD_STATUS.AVAILABLE],
      );

      return CountryMapper.entityFromObject(deleted.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al eliminar');
    }
  }
}
