import { Pool } from 'pg';

import { PostgresDatabase } from '../../data';
import { CustomError } from '../../domain/errors';
import { RECORD_STATUS } from '../../shared/constants';
import { NotificationTypeDB } from '../../data/interfaces';
import {
  CreateNotificationTypeDto,
  UpdateNotificationTypeDto,
} from '../../domain/schemas/notification_type';
import { GetAllFiltersDto } from '../../domain/schemas/general';
import { NotificationTypeDataSource } from '../../ports/data_sources';

export class NotificationTypeDataSourceImpl
  implements NotificationTypeDataSource
{
  private pool: Pool;

  constructor() {
    this.pool = PostgresDatabase.getPool();
  }
  async getNotificationTypeByName(
    name: string,
  ): Promise<NotificationTypeDB | null> {
    try {
      const registerName = await this.pool.query<NotificationTypeDB>(
        `select cnt.nty_id, cnt.nty_name, cnt.nty_description, 
        cnt.nty_created_date, cnt.nty_record_status 
        from core.core_notification_type cnt 
        where lower(cnt.nty_name) = $1;`,
        [name],
      );
      return registerName.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al crear');
    }
  }

  async createNotificationType(
    createNotificationTypeDto: CreateNotificationTypeDto,
  ): Promise<NotificationTypeDB | null> {
    const { name, description } = createNotificationTypeDto;
    try {
      const newRegister = await this.pool.query<NotificationTypeDB>(
        `insert into core.core_notification_type (
            nty_name, nty_description,
            nty_created_date, nty_record_status
          ) values ($1, $2, $3, $4) returning *;`,
        [name, description, new Date(), RECORD_STATUS.AVAILABLE],
      );

      return newRegister.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al crear');
    }
  }

  async getNotificationTypeById(
    id: number,
  ): Promise<NotificationTypeDB | null> {
    try {
      const register = await this.pool.query<NotificationTypeDB>(
        `select cnt.nty_id, cnt.nty_name, cnt.nty_description, 
        cnt.nty_created_date, cnt.nty_record_status 
        from core.core_notification_type cnt 
        where cnt.nty_id = $1;`,
        [id],
      );

      return register.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al crear');
    }
  }

  async getNotificationTypeByIdName(
    id: number,
    name: string,
  ): Promise<NotificationTypeDB | null> {
    try {
      const registerName = await this.pool.query<NotificationTypeDB>(
        `select cnt.nty_id, cnt.nty_name, cnt.nty_description, 
        cnt.nty_created_date, cnt.nty_record_status 
        from core.core_notification_type cnt 
        where lower(cnt.nty_name) = $1 and cnt.nty_id <> $2;`,
        [name, id],
      );

      return registerName.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al crear');
    }
  }

  async updateNotificationType(
    updateNotificationTypeDto: UpdateNotificationTypeDto,
  ): Promise<NotificationTypeDB | null> {
    const { id, name, description } = updateNotificationTypeDto;
    try {
      const registerUpdated = await this.pool.query<NotificationTypeDB>(
        `update core.core_notification_type cnt
        set nty_name = $1, nty_description = $2
        where nty_id = $3 returning *;`,
        [name, description, id],
      );

      return registerUpdated.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al crear');
    }
  }

  async getAllNotificationTypes(
    dto: GetAllFiltersDto,
  ): Promise<NotificationTypeDB[]> {
    const { limit, offset } = dto;
    try {
      let query = `select cnt.nty_id, cnt.nty_name, cnt.nty_description, 
      cnt.nty_created_date, cnt.nty_record_status 
      from core.core_notification_type cnt  `;
      const params: any[] = [];
      let paramIndex = 1;

      query += ` order by cnt.nty_name `;

      query += ` limit $${paramIndex++}`;
      params.push(limit);

      query += ` offset $${paramIndex++}`;
      params.push(offset);

      const genres = await this.pool.query<NotificationTypeDB>(query, params);

      return genres.rows;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al crear');
    }
  }

  async deleteNotificationType(id: number): Promise<NotificationTypeDB | null> {
    try {
      const registerUpdated = await this.pool.query<NotificationTypeDB>(
        `update core.core_notification_type cnt
        set nty_record_status = $1
        where nty_id = $2 returning *;`,
        [RECORD_STATUS.UNAVAILABLE, id],
      );
      return registerUpdated.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al crear');
    }
  }
}
