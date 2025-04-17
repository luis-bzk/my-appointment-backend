import { NotificationType } from '../../entities';
import { NotificationTypeRepository } from '../../../adapters/repositories';
import { GetNotificationTypeDto } from '../../dtos/notification_type';

interface GetNotificationTypeUseCase {
  execute(
    getNotificationTypeDto: GetNotificationTypeDto,
  ): Promise<NotificationType>;
}

export class GetNotificationType implements GetNotificationTypeUseCase {
  private readonly notificationTypeRepository: NotificationTypeRepository;

  constructor(notificationTypeRepository: NotificationTypeRepository) {
    this.notificationTypeRepository = notificationTypeRepository;
  }

  async execute(
    getNotificationTypeDto: GetNotificationTypeDto,
  ): Promise<NotificationType> {
    return this.notificationTypeRepository.get(getNotificationTypeDto);
  }
}
