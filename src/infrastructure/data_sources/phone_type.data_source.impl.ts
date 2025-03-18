import { Pool } from 'pg';

import {
  CreatePhoneTypeDto,
  DeletePhoneTypeDto,
  GetAllPhoneTypesDto,
  GetPhoneTypeDto,
  UpdatePhoneTypeDto,
} from '../../domain/dtos/phone_type';
import { PostgresDatabase } from '../../data';
import { PhoneType } from '../../domain/entities';
import { CustomError } from '../../domain/errors';
import { PhoneTypeDB } from '../../data/interfaces';
import { RECORD_STATUS } from '../../shared/constants';
import { PhoneTypeMapper } from '../mappers/phone_type.mapper';
import { PhoneTypeDataSource } from '../../domain/data_sources';

export class PhoneTypeDataSourceImpl implements PhoneTypeDataSource {
  private pool: Pool;

  constructor() {
    this.pool = PostgresDatabase.getPool();
  }

  async create(createPhoneTypeDto: CreatePhoneTypeDto): Promise<PhoneType> {
    const { name, description } = createPhoneTypeDto;
    try {
      // search by name
      const phoneTypeName = await this.pool.query<PhoneTypeDB>(
        `select
          cpt.pty_id,
          cpt.pty_record_status
        from
          core.core_phone_type cpt
        where
          lower(cpt.pty_name) = $1
          and cpt.pty_record_status = $2;`,
        [name, RECORD_STATUS.AVAILABLE],
      );
      if (phoneTypeName.rows.length > 0) {
        throw CustomError.conflict(
          'Ya existe un registro con el nombre deseado',
        );
      }

      // create
      const newPhoneType = await this.pool.query<PhoneTypeDB>(
        `insert into
          core.core_phone_type (
            pty_name,
            pty_description,
            pty_created_date,
            pty_record_status
          )
        values
          ($1, $2, $3, $4)
        returning
          *;`,
        [name, description, new Date(), RECORD_STATUS.AVAILABLE],
      );

      return PhoneTypeMapper.entityFromObject(newPhoneType.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al crear');
    }
  }

  async update(updatePhoneTypeDto: UpdatePhoneTypeDto): Promise<PhoneType> {
    const { id, name, description } = updatePhoneTypeDto;
    try {
      // search by id
      const phoneType = await this.pool.query<PhoneTypeDB>(
        `select
          cpt.pty_id,
          cpt.pty_record_status
        from
          core.core_phone_type cpt
        where
          cpt.pty_id = $1
          and cpt.pty_record_status = $2;`,
        [id, RECORD_STATUS.AVAILABLE],
      );
      if (phoneType.rows.length === 0) {
        throw CustomError.notFound(
          'No se ha encontrado el registro a actualizar',
        );
      }

      // search instance same name
      const phoneTypeName = await this.pool.query<PhoneTypeDB>(
        `select
          cpt.pty_id,
          cpt.pty_record_status
        from
          core.core_phone_type cpt
        where
          lower(cpt.pty_name) = $1
          and cpt.pty_id <> $2
          and cpt.pty_record_status = $3;`,
        [name, id, RECORD_STATUS.AVAILABLE],
      );
      if (phoneTypeName.rows.length > 0) {
        throw CustomError.conflict(
          'Ya existe otro registro con el nombre deseado',
        );
      }

      // update
      const phoneTypeUpdated = await this.pool.query<PhoneTypeDB>(
        `update core.core_phone_type
        set
          pty_name = $1,
          pty_description = $2
        where
          pty_id = $3
        returning
          *;`,
        [name, description, id],
      );

      return PhoneTypeMapper.entityFromObject(phoneTypeUpdated.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al crear');
    }
  }

  async get(getPhoneTypeDto: GetPhoneTypeDto): Promise<PhoneType> {
    const { id } = getPhoneTypeDto;
    try {
      // search by id
      const phoneType = await this.pool.query<PhoneTypeDB>(
        `select
          cpt.pty_id,
          cpt.pty_name,
          cpt.pty_description,
          cpt.pty_created_date,
          cpt.pty_record_status
        from
          core.core_phone_type cpt
        where
          cpt.pty_id = $1
          and cpt.pty_record_status = $2;`,
        [id, RECORD_STATUS.AVAILABLE],
      );
      if (phoneType.rows.length === 0) {
        throw CustomError.notFound(
          'No se ha encontrado el registro a actualizar',
        );
      }

      return PhoneTypeMapper.entityFromObject(phoneType.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al crear');
    }
  }

  async getAll(getAllPhoneTypesDto: GetAllPhoneTypesDto): Promise<PhoneType[]> {
    const { limit, offset } = getAllPhoneTypesDto;
    try {
      const registers = await this.pool.query<PhoneTypeDB>(
        `select
          cpt.pty_id,
          cpt.pty_name,
          cpt.pty_description,
          cpt.pty_created_date,
          cpt.pty_record_status
        from
          core.core_phone_type cpt
        where
          cpt.pty_record_status = $1
        order by
          cpt.pty_name
        limit $2 offset $3;`,
        [RECORD_STATUS.AVAILABLE, limit, offset],
      );

      return PhoneTypeMapper.entitiesFromArray(registers.rows);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al crear');
    }
  }

  async delete(deletePhoneTypeDto: DeletePhoneTypeDto): Promise<PhoneType> {
    const { id } = deletePhoneTypeDto;
    try {
      // search by id
      const phoneType = await this.pool.query<PhoneTypeDB>(
        `select
          cpt.pty_id,
          cpt.pty_record_status
        from
          core.core_phone_type cpt
        where
          cpt.pty_id = $1
          and cpt.pty_record_status = $2;`,
        [id, RECORD_STATUS.AVAILABLE],
      );
      if (phoneType.rows.length === 0) {
        throw CustomError.notFound(
          'No se ha encontrado el registro a actualizar',
        );
      }

      const phoneTypeDeleted = await this.pool.query<PhoneTypeDB>(
        `delete from core.core_phone_type
        where
          pty_id = $1
        returning
          *;`,
        [id],
      );

      return PhoneTypeMapper.entityFromObject(phoneTypeDeleted.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al crear');
    }
  }
}
