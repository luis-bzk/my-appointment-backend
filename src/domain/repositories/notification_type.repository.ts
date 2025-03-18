import {
  CreateNotificationTypeDto,
  DeleteNotificationTypeDto,
  GetAllNotificationTypesDto,
  GetNotificationTypeDto,
  UpdateNotificationTypeDto,
} from '../dtos/notification_type';
import { NotificationType } from '../entities';

export abstract class NotificationTypeRepository {
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
    getAllNotificationTypesDto: GetAllNotificationTypesDto,
  ): Promise<NotificationType[]>;

  abstract delete(
    deleteNotificationTypeDto: DeleteNotificationTypeDto,
  ): Promise<NotificationType>;
}
