import { Notification } from '../../domain/entities';
import { CreateNotificationDto } from '../../domain/dtos/notification';

export abstract class NotificationDataSource {
  abstract create(
    createNotificationDto: CreateNotificationDto,
  ): Promise<Notification>;
}
