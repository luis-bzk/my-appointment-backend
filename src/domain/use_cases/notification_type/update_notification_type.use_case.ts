import { NotificationType } from '../../entities';
import { NotificationTypeRepository } from '../../../ports/repositories';
import {
  UpdateNotificationTypeDto,
  UpdateNotificationTypePortDto,
  UpdateNotificationTypeSchema,
} from '../../schemas/notification_type';
import { CustomError } from '../../errors';
import { RECORD_STATUS } from '../../../shared';

export class UpdateNotificationTypeUseCase {
  private readonly notificationTypeRepository: NotificationTypeRepository;

  constructor(notificationTypeRepository: NotificationTypeRepository) {
    this.notificationTypeRepository = notificationTypeRepository;
  }

  async execute(dto: UpdateNotificationTypePortDto): Promise<NotificationType> {
    const {
      success,
      error,
      data: schema,
    } = UpdateNotificationTypeSchema.safeParse(dto);
    if (!success) {
      const errorMessage = error.errors[0].message || 'Datos inválidos';
      throw CustomError.badRequest(errorMessage);
    }

    const parsedSchema: UpdateNotificationTypeDto = {
      ...schema,
      id: parseInt(schema.id, 10),
    };

    const notificationTypeExists =
      await this.notificationTypeRepository.getNotificationTypeById(
        parsedSchema.id,
      );
    if (
      !notificationTypeExists ||
      notificationTypeExists.record_status === RECORD_STATUS.UNAVAILABLE
    ) {
      throw CustomError.notFound(
        'No existe un tipo de notificación con el ID proporcionado',
      );
    }

    const notificationTypeWithName =
      await this.notificationTypeRepository.getNotificationTypeByIdName(
        parsedSchema.id,
        parsedSchema.name,
      );
    if (notificationTypeWithName) {
      throw CustomError.conflict(
        'Ya existe un tipo de notificación con el nombre ingresado',
      );
    }

    const updatedNotificationType =
      await this.notificationTypeRepository.updateNotificationType(
        parsedSchema,
      );
    if (!updatedNotificationType) {
      throw CustomError.internalServer(
        'No se pudo actualizar el tipo de notificación',
      );
    }

    return updatedNotificationType;
  }
}
