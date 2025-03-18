import { NotificationType } from '../../entities';
import { NotificationTypeRepository } from '../../repositories';
import { DeleteNotificationTypeDto } from '../../dtos/notification_type';

interface DeleteNotificationTypeUseCase {
  execute(
    deleteNotificationTypeDto: DeleteNotificationTypeDto,
  ): Promise<NotificationType>;
}

export class DeleteNotificationType implements DeleteNotificationTypeUseCase {
  private readonly notificationTypeRepository: NotificationTypeRepository;

  constructor(notificationTypeRepository: NotificationTypeRepository) {
    this.notificationTypeRepository = notificationTypeRepository;
  }

  async execute(
    deleteNotificationTypeDto: DeleteNotificationTypeDto,
  ): Promise<NotificationType> {
    return this.notificationTypeRepository.delete(deleteNotificationTypeDto);
  }
}
