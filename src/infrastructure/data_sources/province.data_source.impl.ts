import { Pool } from 'pg';

import {
  CreateProvinceDto,
  DeleteProvinceDto,
  GetAllProvincesDto,
  GetProvinceDto,
  UpdateProvinceDto,
} from '../../domain/dtos/province';
import { PostgresDatabase } from '../../data';
import { Province } from '../../domain/entities';
import { CustomError } from '../../domain/errors';
import { ProvinceDB } from '../../data/interfaces';
import { RECORD_STATUS } from '../../shared/constants';
import { ProvinceMapper } from '../mappers/province.mapper';
import { ProvinceDataSource } from '../../domain/data_sources';

export class ProvinceDataSourceImpl implements ProvinceDataSource {
  private pool: Pool;

  constructor() {
    this.pool = PostgresDatabase.getPool();
  }

  async create(createProvinceDto: CreateProvinceDto): Promise<Province> {
    const { name, prefix, code, id_country } = createProvinceDto;

    try {
      // validate that don't exist a province with the same name
      const result = await this.pool.query<ProvinceDB>(
        `select
          pro_id,
          pro_record_status
        from
          core.core_province pro
        where
          lower(pro.pro_name) = $1
          and pro.id_country = $2
          and pro.pro_record_status = $3;`,
        [name, id_country, RECORD_STATUS.AVAILABLE],
      );

      if (result.rows.length > 0) {
        throw CustomError.conflict(
          'Ya existe una provincia con el mismo nombre',
        );
      }

      // create province
      const provinceCreated = await this.pool.query<ProvinceDB>(
        `insert into
          core.core_province (
            pro_name,
            pro_code,
            id_country,
            pro_prefix,
            pro_created_date,
            pro_record_status
          )
        values
          ($1, $2, $3, $4, $5, $6)
        returning
          *;`,
        [name, code, id_country, prefix, new Date(), RECORD_STATUS.AVAILABLE],
      );

      return ProvinceMapper.entityFromObject(provinceCreated.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al crear');
    }
  }

  async update(updateProvinceDto: UpdateProvinceDto): Promise<Province> {
    const { id, name, code, prefix, id_country } = updateProvinceDto;

    try {
      // validate exists province
      const province = await this.pool.query<ProvinceDB>(
        `select
          pro_id,
          pro_record_status
        from
          core.core_province pro
        where
          pro.pro_id = $1
          and pro.pro_record_status = $2;`,
        [id, RECORD_STATUS.AVAILABLE],
      );
      if (province.rows.length === 0) {
        throw CustomError.notFound(
          'No se ha encontrado la provincia a actualizar',
        );
      }

      // validate that don't exist a province with the same name
      const provinceToUpdate = await this.pool.query<ProvinceDB>(
        `select
          pro_id,
          pro_record_status
        from
          core.core_province pro
        where
          lower(pro.pro_name) = $1
          and pro.id_country = $2
          and pro.pro_id <> $3
          and pro.pro_record_status = $4;`,
        [name, id_country, id, RECORD_STATUS.AVAILABLE],
      );
      if (provinceToUpdate.rows.length > 0) {
        throw CustomError.conflict(
          'Ya existe una provincia con el nombre ingresado',
        );
      }

      // update
      const updatedRow = await this.pool.query<ProvinceDB>(
        `update core.core_province
        set
          pro_name = $1,
          pro_code = $2,
          id_country = $3,
          pro_prefix = $4
        where
          pro_id = $5
        returning
          *;`,
        [name, code, id_country, prefix, id],
      );

      return ProvinceMapper.entityFromObject(updatedRow.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al actualizar');
    }
  }

  async get(getProvinceDto: GetProvinceDto): Promise<Province> {
    const { id } = getProvinceDto;

    try {
      const result = await this.pool.query<ProvinceDB>(
        `select
          pro.pro_id,
          pro.pro_name,
          pro.pro_code,
          pro.pro_prefix,
          pro.id_country,
          pro.pro_created_date,
          pro.pro_record_status
        from
          core.core_province pro
        where
          pro.pro_id = $1
          and pro.pro_record_status = $2;`,
        [id, RECORD_STATUS.AVAILABLE],
      );
      if (result.rows.length === 0) {
        throw CustomError.notFound('No se ha encontrado la provincia');
      }

      return ProvinceMapper.entityFromObject(result.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al obtener');
    }
  }

  async getAll(getAllProvincesDto: GetAllProvincesDto): Promise<Province[]> {
    const { limit, offset, id_country } = getAllProvincesDto;

    const params: (string | number)[] = [
      RECORD_STATUS.AVAILABLE,
      limit,
      offset,
    ];
    let query = `select
                  pro.pro_id,
                  pro.pro_name,
                  pro.pro_code,
                  pro.pro_prefix,
                  pro.id_country,
                  pro.pro_created_date,
                  pro.pro_record_status
                from
                  core.core_province pro
                  join core.core_country cou on pro.id_country = cou.cou_id
                where
                  pro.pro_record_status = $1 `;

    if (id_country) {
      query += ` and cou.cou_id = $2 
      order by pro.pro_name limit $3 offset $4;`;
      params.splice(1, 0, id_country);
    } else {
      query += ' order by pro.pro_name limit $2 offset $3;';
    }

    try {
      const result = await this.pool.query<ProvinceDB>(query, params);
      return ProvinceMapper.entitiesFromArray(result.rows);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);
      throw CustomError.internalServer(
        'Error en el Data Source al obtener todos',
      );
    }
  }

  async delete(deleteProvinceDto: DeleteProvinceDto): Promise<Province> {
    const { id } = deleteProvinceDto;

    try {
      // validate exists province
      const province = await this.pool.query<ProvinceDB>(
        `select
          pro_id,
          pro_record_status
        from
          core.core_province pro
        where
          pro.pro_id = $1
          and pro.pro_record_status = $2;`,
        [id, RECORD_STATUS.AVAILABLE],
      );
      if (province.rows.length === 0) {
        throw CustomError.notFound(
          'No se ha encontrado la provincia a eliminar',
        );
      }

      const deleted = await this.pool.query<ProvinceDB>(
        `delete from core.core_province
        where
          pro_id = $1
          and pro_record_status = $2
        returning
          *;`,
        [id, RECORD_STATUS.AVAILABLE],
      );

      return ProvinceMapper.entityFromObject(deleted.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al eliminar');
    }
  }
}
