import { NotificationType } from '../../entities';
import { NotificationTypeRepository } from '../../../ports/repositories';
import {
  GetAllFiltersDto,
  GetAllFiltersPortDto,
  GetAllFiltersSchema,
} from '../../schemas/general';
import { CustomError } from '../../errors';

export class GetAllNotificationTypesUseCase {
  private readonly notificationTypeRepository: NotificationTypeRepository;

  constructor(notificationTypeRepository: NotificationTypeRepository) {
    this.notificationTypeRepository = notificationTypeRepository;
  }

  async execute(dto: GetAllFiltersPortDto): Promise<NotificationType[]> {
    const { success, error, data: schema } = GetAllFiltersSchema.safeParse(dto);
    if (!success) {
      const message = error.errors[0]?.message || 'Datos inválidos';
      throw CustomError.badRequest(message);
    }

    const parsedSchema: GetAllFiltersDto = {
      ...schema,
      limit: schema.limit ? parseInt(schema.limit ?? '', 10) : undefined,
      offset: schema.offset ? parseInt(schema.offset ?? '', 10) : undefined,
    };

    return await this.notificationTypeRepository.getAllNotificationTypes(
      parsedSchema,
    );
  }
}
