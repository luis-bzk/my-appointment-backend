import {
  IdentTypeIdPortDto,
  IdentTypeIdSchema,
} from '../../schemas/identification_type';
import { CustomError } from '../../errors';
import { IdentificationType } from '../../entities';
import { IdentificationTypeRepository } from '../../../ports/repositories';

export class GetIdentificationTypeUseCase {
  private readonly identTypeRepository: IdentificationTypeRepository;

  constructor(identTypeRepository: IdentificationTypeRepository) {
    this.identTypeRepository = identTypeRepository;
  }

  async execute(dto: IdentTypeIdPortDto): Promise<IdentificationType> {
    const { success, error, data: schema } = IdentTypeIdSchema.safeParse(dto);
    if (!success) {
      const errorMessage = error.errors[0].message || 'Datos inválidos';
      throw CustomError.badRequest(errorMessage);
    }

    const parsedId = parseInt(schema.id, 10);

    const identificationType =
      await this.identTypeRepository.getIdentTypeById(parsedId);
    if (!identificationType) {
      throw CustomError.notFound(
        'No se encontró el tipo de identificación solicitado',
      );
    }

    return identificationType;
  }
}
