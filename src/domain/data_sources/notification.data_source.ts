import { Notification } from '../entities';
import { CreateNotificationDto } from '../dtos/notification';

export abstract class NotificationDataSource {
  abstract create(
    createNotificationDto: CreateNotificationDto,
  ): Promise<Notification>;
}
