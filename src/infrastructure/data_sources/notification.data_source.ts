import { Pool } from 'pg';
import { PostgresDatabase } from '../../data';
import { RECORD_STATUS } from '../../shared';
import { Notification } from '../../domain/entities';
import { NotificationDB } from '../../data/interfaces';
import { NotificationMapper } from '../mappers/notification.mapper';
import { NotificationDataSource } from '../../ports/data_sources';
import { CreateNotificationDto } from '../../domain/dtos/notification';
import { CustomError } from '../../domain/errors';
export class NotificationDataSourceImpl implements NotificationDataSource {
  private pool: Pool;

  constructor() {
    this.pool = PostgresDatabase.getPool();
  }

  async create(
    createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    const { id_user, id_notification_type, message } = createNotificationDto;

    try {
      // create
      const createNotification = await this.pool.query<NotificationDB>(
        `insert into
            data.data_notification (
              not_message,
              not_is_read,
              not_created_date,
              not_record_status,
              id_notification_type,
              id_user
            ) values
             ($1, $2, $3, $4, $5, $6) returning *;`,
        [
          message,
          false,
          new Date(),
          RECORD_STATUS.AVAILABLE,
          id_notification_type,
          id_user,
        ],
      );

      return NotificationMapper.entityFromObject(createNotification.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al crear');
    }
  }
}
