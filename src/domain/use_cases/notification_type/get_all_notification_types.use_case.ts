import { NotificationType } from '../../entities';
import { NotificationTypeRepository } from '../../../ports/repositories';
import { GetAllNotificationTypesDto } from '../../dtos/notification_type';

interface GetAllNotificationTypesUseCase {
  execute(
    getAllNotificationTypesDto: GetAllNotificationTypesDto,
  ): Promise<NotificationType[]>;
}

export class GetAllNotificationTypes implements GetAllNotificationTypesUseCase {
  private readonly notificationTypeRepository: NotificationTypeRepository;

  constructor(notificationTypeRepository: NotificationTypeRepository) {
    this.notificationTypeRepository = notificationTypeRepository;
  }

  async execute(
    getAllNotificationTypesDto: GetAllNotificationTypesDto,
  ): Promise<NotificationType[]> {
    return await this.notificationTypeRepository.getAll(
      getAllNotificationTypesDto,
    );
  }
}
