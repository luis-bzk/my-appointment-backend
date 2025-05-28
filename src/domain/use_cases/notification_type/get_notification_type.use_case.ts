import { NotificationType } from '../../entities';
import { NotificationTypeRepository } from '../../../ports/repositories';
import {
  NotificationTypeIdPortDto,
  NotificationTypeIdSchema,
} from '../../schemas/notification_type';
import { CustomError } from '../../errors';

export class GetNotificationTypeUseCase {
  private readonly notificationTypeRepository: NotificationTypeRepository;

  constructor(notificationTypeRepository: NotificationTypeRepository) {
    this.notificationTypeRepository = notificationTypeRepository;
  }

  async execute(dto: NotificationTypeIdPortDto): Promise<NotificationType> {
    const {
      success,
      error,
      data: schema,
    } = NotificationTypeIdSchema.safeParse(dto);
    if (!success) {
      const errorMessage = error.errors[0].message || 'Datos inválidos';
      throw CustomError.badRequest(errorMessage);
    }

    const parsedId = parseInt(schema.id, 10);

    const notificationType =
      await this.notificationTypeRepository.getNotificationTypeById(parsedId);
    if (!notificationType) {
      throw CustomError.notFound(
        'No existe un tipo de notificación con el ID proporcionado',
      );
    }

    return notificationType;
  }
}
