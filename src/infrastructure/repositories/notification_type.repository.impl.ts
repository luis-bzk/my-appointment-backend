import { NotificationType } from '../../domain/entities';
import { GetAllFiltersDto } from '../../domain/schemas/general';
import {
  CreateNotificationTypeDto,
  UpdateNotificationTypeDto,
} from '../../domain/schemas/notification_type';
import { NotificationTypeDataSource } from '../../ports/data_sources';
import { NotificationTypeRepository } from '../../ports/repositories';
import { NotificationTypeMapper } from '../mappers';

export class NotificationTypeRepositoryImpl
  implements NotificationTypeRepository
{
  private readonly notificationTypeDataSource: NotificationTypeDataSource;

  constructor(notificationTypeDataSource: NotificationTypeDataSource) {
    this.notificationTypeDataSource = notificationTypeDataSource;
  }

  async getNotificationTypeByName(
    name: string,
  ): Promise<NotificationType | null> {
    const notificationType =
      await this.notificationTypeDataSource.getNotificationTypeByName(name);
    return NotificationTypeMapper.entityFromObject(notificationType);
  }

  async createNotificationType(
    createNotificationTypeDto: CreateNotificationTypeDto,
  ): Promise<NotificationType | null> {
    const notificationType =
      await this.notificationTypeDataSource.createNotificationType(
        createNotificationTypeDto,
      );
    return NotificationTypeMapper.entityFromObject(notificationType);
  }

  async getNotificationTypeById(id: number): Promise<NotificationType | null> {
    const notificationType =
      await this.notificationTypeDataSource.getNotificationTypeById(id);
    return NotificationTypeMapper.entityFromObject(notificationType);
  }

  async getNotificationTypeByIdName(
    id: number,
    name: string,
  ): Promise<NotificationType | null> {
    const notificationType =
      await this.notificationTypeDataSource.getNotificationTypeByIdName(
        id,
        name,
      );
    return NotificationTypeMapper.entityFromObject(notificationType);
  }

  async updateNotificationType(
    updateNotificationTypeDto: UpdateNotificationTypeDto,
  ): Promise<NotificationType | null> {
    const notificationType =
      await this.notificationTypeDataSource.updateNotificationType(
        updateNotificationTypeDto,
      );
    return NotificationTypeMapper.entityFromObject(notificationType);
  }

  async getAllNotificationTypes(
    dto: GetAllFiltersDto,
  ): Promise<NotificationType[]> {
    const notificationTypes =
      await this.notificationTypeDataSource.getAllNotificationTypes(dto);
    return NotificationTypeMapper.entitiesFromArray(notificationTypes);
  }

  async deleteNotificationType(id: number): Promise<NotificationType | null> {
    const notificationType =
      await this.notificationTypeDataSource.deleteNotificationType(id);
    return NotificationTypeMapper.entityFromObject(notificationType);
  }
}
