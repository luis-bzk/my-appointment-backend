import {
  CreateNotificationTypeDto,
  DeleteNotificationTypeDto,
  GetAllNotificationTypesDto,
  GetNotificationTypeDto,
  UpdateNotificationTypeDto,
} from '../../domain/dtos/notification_type';
import { NotificationType } from '../../domain/entities';
import { NotificationTypeDataSource } from '../../domain/data_sources';
import { NotificationTypeRepository } from '../../domain/repositories';

export class NotificationTypeRepositoryImpl
  implements NotificationTypeRepository
{
  private readonly notificationTypeDataSource: NotificationTypeDataSource;

  constructor(notificationTypeDataSource: NotificationTypeDataSource) {
    this.notificationTypeDataSource = notificationTypeDataSource;
  }

  create(
    createNotificationTypeDto: CreateNotificationTypeDto,
  ): Promise<NotificationType> {
    return this.notificationTypeDataSource.create(createNotificationTypeDto);
  }

  update(
    updateNotificationTypeDto: UpdateNotificationTypeDto,
  ): Promise<NotificationType> {
    return this.notificationTypeDataSource.update(updateNotificationTypeDto);
  }

  get(
    getNotificationTypeDto: GetNotificationTypeDto,
  ): Promise<NotificationType> {
    return this.notificationTypeDataSource.get(getNotificationTypeDto);
  }

  getAll(
    getAllNotificationTypesDto: GetAllNotificationTypesDto,
  ): Promise<NotificationType[]> {
    return this.notificationTypeDataSource.getAll(getAllNotificationTypesDto);
  }

  delete(
    deleteNotificationTypeDto: DeleteNotificationTypeDto,
  ): Promise<NotificationType> {
    return this.notificationTypeDataSource.delete(deleteNotificationTypeDto);
  }
}
