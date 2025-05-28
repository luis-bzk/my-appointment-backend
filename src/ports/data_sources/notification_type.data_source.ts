import {
  CreateNotificationTypeDto,
  UpdateNotificationTypeDto,
} from '../../domain/schemas/notification_type';
import { NotificationTypeDB } from '../../data/interfaces';
import { GetAllFiltersDto } from '../../domain/schemas/general';

export abstract class NotificationTypeDataSource {
  abstract getNotificationTypeByName(
    name: string,
  ): Promise<NotificationTypeDB | null>;

  abstract createNotificationType(
    createNotificationTypeDto: CreateNotificationTypeDto,
  ): Promise<NotificationTypeDB | null>;

  abstract getNotificationTypeById(
    id: number,
  ): Promise<NotificationTypeDB | null>;

  abstract getNotificationTypeByIdName(
    id: number,
    name: string,
  ): Promise<NotificationTypeDB | null>;

  abstract updateNotificationType(
    updateNotificationTypeDto: UpdateNotificationTypeDto,
  ): Promise<NotificationTypeDB | null>;

  abstract getAllNotificationTypes(
    dto: GetAllFiltersDto,
  ): Promise<NotificationTypeDB[]>;

  abstract deleteNotificationType(
    id: number,
  ): Promise<NotificationTypeDB | null>;
}
