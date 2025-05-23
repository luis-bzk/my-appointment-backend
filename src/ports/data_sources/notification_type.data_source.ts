import {
  CreateNotificationTypeDto,
  DeleteNotificationTypeDto,
  GetAllNotificationTypesDto,
  GetNotificationTypeDto,
  UpdateNotificationTypeDto,
} from '../../domain/dtos/notification_type';
import { NotificationType } from '../../domain/entities';

export abstract class NotificationTypeDataSource {
  abstract create(
    createNotificationTypeDto: CreateNotificationTypeDto,
  ): Promise<NotificationType>;

  abstract update(
    updateNotificationTypeDto: UpdateNotificationTypeDto,
  ): Promise<NotificationType>;

  abstract get(
    getNotificationTypeDto: GetNotificationTypeDto,
  ): Promise<NotificationType>;

  abstract getAll(
    getAllNotificationTypeDto: GetAllNotificationTypesDto,
  ): Promise<NotificationType[]>;

  abstract delete(
    deleteNotificationTypeDto: DeleteNotificationTypeDto,
  ): Promise<NotificationType>;
}
