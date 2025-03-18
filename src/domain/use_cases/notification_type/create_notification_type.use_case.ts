import { NotificationType } from '../../entities';
import { NotificationTypeRepository } from '../../repositories';
import { CreateNotificationTypeDto } from '../../dtos/notification_type';

interface CreateNotificationTypeUseCase {
  execute(
    createNotificationTypeDto: CreateNotificationTypeDto,
  ): Promise<NotificationType>;
}

export class CreateNotificationType implements CreateNotificationTypeUseCase {
  private readonly notificationTypeRepository: NotificationTypeRepository;

  constructor(notificationTypeRepository: NotificationTypeRepository) {
    this.notificationTypeRepository = notificationTypeRepository;
  }

  async execute(
    createNotificationTypeDto: CreateNotificationTypeDto,
  ): Promise<NotificationType> {
    return await this.notificationTypeRepository.create(
      createNotificationTypeDto,
    );
  }
}
