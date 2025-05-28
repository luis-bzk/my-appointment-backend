import { NotificationType } from '../../entities';
import { NotificationTypeRepository } from '../../../ports/repositories';
import {
  CreateNotificationTypeDto,
  CreateNotificationTypeSchema,
} from '../../schemas/notification_type';
import { CustomError } from '../../errors';

export class CreateNotificationTypeUseCase {
  private readonly notificationTypeRepository: NotificationTypeRepository;

  constructor(notificationTypeRepository: NotificationTypeRepository) {
    this.notificationTypeRepository = notificationTypeRepository;
  }

  async execute(dto: CreateNotificationTypeDto): Promise<NotificationType> {
    const {
      success,
      error,
      data: schema,
    } = CreateNotificationTypeSchema.safeParse(dto);
    if (!success) {
      const errorMessage = error.errors[0].message || 'Datos inválidos';
      throw CustomError.badRequest(errorMessage);
    }

    const notificationTypeName =
      await this.notificationTypeRepository.getNotificationTypeByName(
        schema.name,
      );
    if (notificationTypeName) {
      throw CustomError.conflict(
        'Ya existe un tipo de notificación con el nombre ingresado',
      );
    }

    const createdNotificationType =
      await this.notificationTypeRepository.createNotificationType(schema);
    if (!createdNotificationType) {
      throw CustomError.internalServer(
        'No se pudo crear el tipo de notificación',
      );
    }
    return createdNotificationType;
  }
}
