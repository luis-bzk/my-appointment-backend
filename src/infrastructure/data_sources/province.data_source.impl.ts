import { Pool } from 'pg';

import { PostgresDatabase } from '../../data';
import { CustomError } from '../../domain/errors';
import { ProvinceDB } from '../../data/interfaces';
import { RECORD_STATUS } from '../../shared/constants';
import { ProvinceDataSource } from '../../ports/data_sources';
import {
  CreateProvinceDto,
  GetAllProvincesDto,
  UpdateProvinceDto,
} from '../../domain/schemas/province';

export class ProvinceDataSourceImpl implements ProvinceDataSource {
  private pool: Pool;

  constructor() {
    this.pool = PostgresDatabase.getPool();
  }

  async getProvinceByName(
    name: string,
    id_country: number,
  ): Promise<ProvinceDB | null> {
    try {
      const province = await this.pool.query<ProvinceDB>(
        `select pro.pro_id, pro.pro_name, pro.pro_code, pro.pro_prefix, 
        pro.pro_created_date, pro.pro_record_status, pro.id_country
        from core.core_province pro
        where lower(pro.pro_name) = $1 and pro.id_country = $2`,
        [name, id_country],
      );

      return province.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al obtener');
    }
  }

  async createProvince(
    createProvinceDto: CreateProvinceDto,
  ): Promise<ProvinceDB | null> {
    const { name, prefix, code, id_country } = createProvinceDto;

    try {
      const provinceCreated = await this.pool.query<ProvinceDB>(
        `insert into core.core_province (
            pro_name, pro_code, id_country, pro_prefix,
            pro_created_date, pro_record_status
          ) values ($1, $2, $3, $4, $5, $6) returning *;`,
        [name, code, id_country, prefix, new Date(), RECORD_STATUS.AVAILABLE],
      );

      return provinceCreated.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al crear');
    }
  }

  async getProvinceById(id: number): Promise<ProvinceDB | null> {
    try {
      const province = await this.pool.query<ProvinceDB>(
        `select pro.pro_id, pro.pro_name, pro.pro_code, pro.pro_prefix, 
        pro.pro_created_date, pro.pro_record_status, pro.id_country
        from core.core_province pro where pro.pro_id = $1;`,
        [id],
      );

      return province.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al actualizar');
    }
  }

  async getProvinceByIdName(
    id: number,
    name: string,
    id_country: number,
  ): Promise<ProvinceDB | null> {
    try {
      const province = await this.pool.query<ProvinceDB>(
        `select pro.pro_id, pro.pro_name, pro.pro_code, pro.pro_prefix, 
        pro.pro_created_date, pro.pro_record_status, pro.id_country
        from core.core_province pro
        where lower(pro.pro_name) = $1 and pro.id_country = $2 and pro.pro_id <> $3;`,
        [name, id_country, id],
      );

      return province.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al actualizar');
    }
  }

  async updateProvince(
    updateProvinceDto: UpdateProvinceDto,
  ): Promise<ProvinceDB | null> {
    const { id, name, code, prefix, id_country } = updateProvinceDto;

    try {
      const updatedRow = await this.pool.query<ProvinceDB>(
        `update core.core_province
        set pro_name = $1, pro_code = $2, id_country = $3, pro_prefix = $4
        where pro_id = $5 returning *;`,
        [name, code, id_country, prefix, id],
      );

      return updatedRow.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al actualizar');
    }
  }

  async getAllProvinces(
    getAllProvincesDto: GetAllProvincesDto,
  ): Promise<ProvinceDB[]> {
    const { limit = 50, offset = 0, id_country, filter } = getAllProvincesDto;

    try {
      let query = `
      select pro.pro_id, pro.pro_name, pro.pro_code, pro.pro_prefix, 
             pro.pro_created_date, pro.pro_record_status, pro.id_country
      from core.core_province pro
      join core.core_country cou on pro.id_country = cou.cou_id`;

      const conditions: string[] = [];
      const params: (string | number)[] = [];
      let paramIndex = 1;

      if (id_country) {
        conditions.push(`cou.cou_id = $${paramIndex++}`);
        params.push(id_country);
      }

      if (filter) {
        conditions.push(`(
        pro.pro_name ilike $${paramIndex} or
        pro.pro_code ilike $${paramIndex} or
        pro.pro_prefix ilike $${paramIndex}
      )`);
        params.push(`%${filter}%`);
        paramIndex++;
      }

      if (conditions.length > 0) {
        query += ` where ${conditions.join(' and ')}`;
      }

      query += ` order by pro.pro_name`;
      query += ` limit $${paramIndex++}`;
      params.push(limit);

      query += ` offset $${paramIndex++}`;
      params.push(offset);

      const result = await this.pool.query<ProvinceDB>(query, params);
      return result.rows;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      console.log({ error });
      throw CustomError.internalServer(
        'Error en el Data Source al obtener provincias',
      );
    }
  }

  async deleteProvince(provinceId: number): Promise<ProvinceDB | null> {
    try {
      const deleted = await this.pool.query<ProvinceDB>(
        `update core.core_province
        set pro_record_status = $1
        where pro_id = $2 returning *;`,
        [RECORD_STATUS.UNAVAILABLE, provinceId],
      );

      return deleted.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al eliminar');
    }
  }
}
