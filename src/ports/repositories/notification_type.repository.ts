import { NotificationType } from '../../domain/entities';
import { GetAllFiltersDto } from '../../domain/schemas/general';
import {
  CreateNotificationTypeDto,
  UpdateNotificationTypeDto,
} from '../../domain/schemas/notification_type';

export abstract class NotificationTypeRepository {
  abstract getNotificationTypeByName(
    name: string,
  ): Promise<NotificationType | null>;

  abstract createNotificationType(
    createNotificationTypeDto: CreateNotificationTypeDto,
  ): Promise<NotificationType | null>;

  abstract getNotificationTypeById(
    id: number,
  ): Promise<NotificationType | null>;

  abstract getNotificationTypeByIdName(
    id: number,
    name: string,
  ): Promise<NotificationType | null>;

  abstract updateNotificationType(
    updateNotificationTypeDto: UpdateNotificationTypeDto,
  ): Promise<NotificationType | null>;

  abstract getAllNotificationTypes(
    dto: GetAllFiltersDto,
  ): Promise<NotificationType[]>;

  abstract deleteNotificationType(id: number): Promise<NotificationType | null>;
}
