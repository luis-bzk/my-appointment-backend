import { NotificationType } from '../../entities';
import { NotificationTypeRepository } from '../../../ports/repositories';
import {
  NotificationTypeIdPortDto,
  NotificationTypeIdSchema,
} from '../../schemas/notification_type';
import { CustomError } from '../../errors';
import { RECORD_STATUS } from '../../../shared';

export class DeleteNotificationTypeUseCase {
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
    if (
      !notificationType ||
      notificationType.record_status === RECORD_STATUS.UNAVAILABLE
    ) {
      throw CustomError.notFound(
        'No existe un tipo de notificación con el ID proporcionado',
      );
    }

    const deletedNotificationType =
      await this.notificationTypeRepository.deleteNotificationType(parsedId);
    if (!deletedNotificationType) {
      throw CustomError.internalServer(
        'No se pudo eliminar el tipo de notificación',
      );
    }

    return notificationType;
  }
}
