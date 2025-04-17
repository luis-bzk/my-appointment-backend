import { Pool } from 'pg';

import { PostgresDatabase } from '../../data';
import {
  CreateIdentTypeDto,
  DeleteIdentTypeDto,
  GetAllIdentTypesDto,
  GetIdentTypeDto,
  UpdateIdentTypeDto,
} from '../../domain/dtos/identification_type';
import { CustomError } from '../../domain/errors';
import {
  IdentificationType,
  IdentificationTypeDetail,
} from '../../domain/entities';
import {
  IdentificationTypeDB,
  IdentificationTypeDetailDB,
} from '../../data/interfaces';
import { RECORD_STATUS } from '../../shared/constants';
import { IdentificationTypeDataSource } from '../../adapters/data_sources';
import { IdentificationTypeMapper } from '../mappers/identification_type.mapper';

export class IdentificationTypeDataSourceImpl
  implements IdentificationTypeDataSource
{
  private pool: Pool;

  constructor() {
    this.pool = PostgresDatabase.getPool();
  }

  async create(
    createIdentTypeDto: CreateIdentTypeDto,
  ): Promise<IdentificationType> {
    const { name, description, abbreviation, id_country } = createIdentTypeDto;

    try {
      // search by name
      const identTypeName = await this.pool.query<IdentificationTypeDB>(
        `select
          cit.ity_id,
          cit.ity_record_status
        from
          core.core_identification_type cit
        where
          lower(cit.ity_name) = $1
          and cit.ity_record_status = $2;`,
        [name, RECORD_STATUS.AVAILABLE],
      );

      if (identTypeName.rows.length > 0) {
        throw CustomError.conflict(
          'Ya existe un tipo de identificación con el mismo nombre',
        );
      }

      // create
      const identTypeCreated = await this.pool.query<IdentificationTypeDB>(
        `insert into
          core.core_identification_type (
            ity_name,
            ity_description,
            ity_abbreviation,
            id_country,
            ity_created_date,
            ity_record_status
          )
        values
          ($1, $2, $3, $4, $5, $6) returning *;`,
        [
          name,
          description,
          abbreviation,
          id_country,
          new Date(),
          RECORD_STATUS.AVAILABLE,
        ],
      );

      return IdentificationTypeMapper.entityFromObject(
        identTypeCreated.rows[0],
      );
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al crear');
    }
  }

  async update(
    updateIdentTypeDto: UpdateIdentTypeDto,
  ): Promise<IdentificationType> {
    const { id, name, description, abbreviation, id_country } =
      updateIdentTypeDto;

    try {
      // find by id
      const identType = await this.pool.query<IdentificationTypeDB>(
        `select
          cit.ity_id,
          cit.ity_record_status
        from
          core.core_identification_type cit
        where
          cit.ity_id = $1
          and cit.ity_record_status = $2;`,
        [id, RECORD_STATUS.AVAILABLE],
      );
      if (identType.rows.length === 0) {
        throw CustomError.notFound(
          'No se ha encontrado el tipo de identificación',
        );
      }

      // find name other id
      const identTypeName = await this.pool.query<IdentificationTypeDB>(
        `select
          cit.ity_id,
          cit.ity_record_status
        from
          core.core_identification_type cit
        where
          lower(cit.ity_name) = $1
          and cit.ity_id <> $2
          and cit.ity_record_status = $3;`,
        [name, id, RECORD_STATUS.AVAILABLE],
      );
      if (identTypeName.rows.length > 0) {
        throw CustomError.conflict(
          'Ya existe un tipo de identificación con el mismo nombre',
        );
      }

      // update
      const updatedRegister = await this.pool.query<IdentificationTypeDB>(
        `update core.core_identification_type
        set
          ity_name = $1,
          ity_description = $2,
          ity_abbreviation = $3,
          id_country = $4
        where
          ity_id = $5 returning *;`,
        [name, description, abbreviation, id_country, id],
      );

      return IdentificationTypeMapper.entityFromObject(updatedRegister.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al actualizar');
    }
  }

  async get(getIdentTypeDto: GetIdentTypeDto): Promise<IdentificationType> {
    const { id } = getIdentTypeDto;
    try {
      // find by id
      const identType = await this.pool.query<IdentificationTypeDB>(
        `select
          cit.ity_id,
          cit.ity_name,
          cit.ity_description,
          cit.ity_abbreviation,
          cit.id_country,
          cit.ity_created_date,
          cit.ity_record_status
        from
          core.core_identification_type cit
        where
          cit.ity_id = $1
          and cit.ity_record_status = $2;`,
        [id, RECORD_STATUS.AVAILABLE],
      );
      if (identType.rows.length === 0) {
        throw CustomError.notFound(
          'No se ha encontrado el tipo de identificación',
        );
      }

      return IdentificationTypeMapper.entityFromObject(identType.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al obtener');
    }
  }

  async getAll(
    getAllIdentTypesDto: GetAllIdentTypesDto,
  ): Promise<IdentificationType[]> {
    const { limit, offset } = getAllIdentTypesDto;
    try {
      const registers = await this.pool.query<IdentificationTypeDB>(
        `select
          cit.ity_id,
          cit.ity_name,
          cit.ity_description,
          cit.ity_abbreviation,
          cit.id_country,
          cit.ity_created_date,
          cit.ity_record_status
        from
          core.core_identification_type cit
        where
          cit.ity_record_status = $1
        order by
          cit.ity_name
        limit $2 offset $3;`,
        [RECORD_STATUS.AVAILABLE, limit, offset],
      );

      return IdentificationTypeMapper.entitiesFromArray(registers.rows);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al obtener');
    }
  }

  async getAllDetail(
    getAllIdentTypesDetailDto: GetAllIdentTypesDto,
  ): Promise<IdentificationTypeDetail[]> {
    const { limit, offset } = getAllIdentTypesDetailDto;
    try {
      const registers = await this.pool.query<IdentificationTypeDetailDB>(
        `select
          cit.ity_id,
          cit.ity_name,
          cit.ity_description,
          cit.ity_abbreviation,
          cit.id_country,
          cit.ity_created_date,
          cit.ity_record_status,
          cc.cou_id,
          cc.cou_name,
          cc.cou_code,
          cc.cou_prefix,
          cc.cou_created_date,
          cc.cou_record_status
        from
          core.core_identification_type cit
          join core.core_country cc on cit.id_country = cc.cou_id
        where
          cit.ity_record_status = $1
        order by
          cit.ity_name
        limit $2 offset $3;`,
        [RECORD_STATUS.AVAILABLE, limit, offset],
      );

      return IdentificationTypeMapper.entitiesFromArrayDetail(registers.rows);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al obtener');
    }
  }

  async delete(
    deleteIdentTypeDto: DeleteIdentTypeDto,
  ): Promise<IdentificationType> {
    const { id } = deleteIdentTypeDto;
    try {
      // find by id
      const identType = await this.pool.query<IdentificationTypeDB>(
        `select
          cit.ity_id,
          cit.ity_record_status
        from
          core.core_identification_type cit
        where
          cit.ity_id = $1
          and cit.ity_record_status = $2;`,
        [id, RECORD_STATUS.AVAILABLE],
      );
      if (identType.rows.length === 0) {
        throw CustomError.notFound(
          'No se ha encontrado el tipo de identificación',
        );
      }

      // delete
      const deletedRegister = await this.pool.query<IdentificationTypeDB>(
        `delete from core.core_identification_type
        where
          ity_id = $1 returning *;`,
        [id],
      );
      return IdentificationTypeMapper.entityFromObject(deletedRegister.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al borrar');
    }
  }
}
