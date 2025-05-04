import { Pool } from 'pg';

import { PostgresDatabase } from '../../data';
import { NotificationType } from '../../domain/entities';
import { NotificationTypeDataSource } from '../../ports/data_sources';
import {
  CreateNotificationTypeDto,
  DeleteNotificationTypeDto,
  GetAllNotificationTypesDto,
  GetNotificationTypeDto,
  UpdateNotificationTypeDto,
} from '../../domain/dtos/notification_type';
import { CustomError } from '../../domain/errors';
import { RECORD_STATUS } from '../../shared/constants';
import { NotificationTypeDB } from '../../data/interfaces';
import { NotificationTypeMapper } from '../mappers/notification_type.mapper';

export class NotificationTypeDataSourceImpl
  implements NotificationTypeDataSource
{
  private pool: Pool;

  constructor() {
    this.pool = PostgresDatabase.getPool();
  }

  async create(
    createNotificationTypeDto: CreateNotificationTypeDto,
  ): Promise<NotificationType> {
    const { name, description } = createNotificationTypeDto;
    try {
      // search register
      const registerName = await this.pool.query<NotificationTypeDB>(
        `select
          cnt.nty_id,
          cnt.nty_record_status
        from
          core.core_notification_type cnt
        where
          lower(cnt.nty_name) = $1
          and cnt.nty_record_status = $2;`,
        [name, RECORD_STATUS.AVAILABLE],
      );

      if (registerName.rows.length > 0) {
        throw CustomError.conflict('Ya existe un registro con el mismo nombre');
      }

      // insert
      const newRegister = await this.pool.query<NotificationTypeDB>(
        `insert into
          core.core_notification_type (
            nty_name,
            nty_description,
            nty_created_date,
            nty_record_status
          )
        values
          ($1, $2, $3, $4) returning *;`,
        [name, description, new Date(), RECORD_STATUS.AVAILABLE],
      );

      return NotificationTypeMapper.entityFromObject(newRegister.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al crear');
    }
  }

  async update(
    updateNotificationTypeDto: UpdateNotificationTypeDto,
  ): Promise<NotificationType> {
    const { id, name, description } = updateNotificationTypeDto;
    try {
      // find by id
      const register = await this.pool.query<NotificationTypeDB>(
        `select
          cnt.nty_id,
          cnt.nty_record_status
        from
          core.core_notification_type cnt
        where
          cnt.nty_id = $1
          and cnt.nty_record_status = $2;`,
        [id, RECORD_STATUS.AVAILABLE],
      );

      if (register.rows.length === 0) {
        throw CustomError.notFound(
          'No se ha encontrado el registro solicitado',
        );
      }

      // find same name other id
      const registerName = await this.pool.query<NotificationTypeDB>(
        `select
          cnt.nty_id,
          cnt.nty_record_status
        from
          core.core_notification_type cnt
        where
          lower(cnt.nty_name) = $1
          and cnt.nty_id <> $2
          and cnt.nty_record_status = $2;`,
        [name, id, RECORD_STATUS.AVAILABLE],
      );
      if (registerName.rows.length > 0) {
        throw CustomError.conflict('ya existe un registro con el mismo nombre');
      }

      // update
      const registerUpdated = await this.pool.query<NotificationTypeDB>(
        `update core.core_notification_type cnt
        set
          nty_name = $1,
          nty_description = $2
        where
          nty_id = $3 returning *;`,
        [name, description, id],
      );

      return NotificationTypeMapper.entityFromObject(registerUpdated.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al crear');
    }
  }

  async get(
    getNotificationTypeDto: GetNotificationTypeDto,
  ): Promise<NotificationType> {
    const { id } = getNotificationTypeDto;
    try {
      // find by id
      const register = await this.pool.query<NotificationTypeDB>(
        `select
          cnt.nty_id,
          cnt.nty_name,
          cnt.nty_description,
          cnt.nty_created_date,
          cnt.nty_record_status
        from
          core.core_notification_type cnt
        where
          cnt.nty_id = $1
          and cnt.nty_record_status = $2;`,
        [id, RECORD_STATUS.AVAILABLE],
      );

      if (register.rows.length === 0) {
        throw CustomError.notFound(
          'No se ha encontrado el registro solicitado',
        );
      }

      return NotificationTypeMapper.entityFromObject(register.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al crear');
    }
  }

  async getAll(
    getAllNotificationTypeDto: GetAllNotificationTypesDto,
  ): Promise<NotificationType[]> {
    const { limit, offset } = getAllNotificationTypeDto;
    try {
      const registers = await this.pool.query<NotificationTypeDB>(
        `select
          cnt.nty_id,
          cnt.nty_name,
          cnt.nty_description,
          cnt.nty_created_date,
          cnt.nty_record_status
        from
          core.core_notification_type cnt
        where
          cnt.nty_record_status = $1
        order by
          cnt.nty_name
        limit $2 offset $3;`,
        [RECORD_STATUS.AVAILABLE, limit, offset],
      );

      return NotificationTypeMapper.entitiesFromArray(registers.rows);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al crear');
    }
  }

  async delete(
    deleteNotificationTypeDto: DeleteNotificationTypeDto,
  ): Promise<NotificationType> {
    const { id } = deleteNotificationTypeDto;
    try {
      // find by id
      const register = await this.pool.query<NotificationTypeDB>(
        `select
          cnt.nty_id,
          cnt.nty_record_status
        from
          core.core_notification_type cnt
        where
          cnt.nty_id = $1
          and cnt.nty_record_status = $2;`,
        [id, RECORD_STATUS.AVAILABLE],
      );

      if (register.rows.length === 0) {
        throw CustomError.notFound(
          'No se ha encontrado el registro solicitado',
        );
      }

      // delete
      const deletedRegister = await this.pool.query<NotificationTypeDB>(
        `delete from core.core_notification_type
        where
          nty_id = $1 returning *;`,
        [id],
      );

      return NotificationTypeMapper.entityFromObject(deletedRegister.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al crear');
    }
  }
}
