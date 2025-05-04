import { NotificationType } from '../../entities';
import { NotificationTypeRepository } from '../../../ports/repositories';
import { UpdateNotificationTypeDto } from '../../dtos/notification_type';

interface UpdateNotificationTypeUseCase {
  execute(
    updateNotificationTypeDto: UpdateNotificationTypeDto,
  ): Promise<NotificationType>;
}

export class UpdateNotificationType implements UpdateNotificationTypeUseCase {
  private readonly notificationTypeRepository: NotificationTypeRepository;

  constructor(notificationTypeRepository: NotificationTypeRepository) {
    this.notificationTypeRepository = notificationTypeRepository;
  }

  async execute(
    updateNotificationTypeDto: UpdateNotificationTypeDto,
  ): Promise<NotificationType> {
    return await this.notificationTypeRepository.update(
      updateNotificationTypeDto,
    );
  }
}
