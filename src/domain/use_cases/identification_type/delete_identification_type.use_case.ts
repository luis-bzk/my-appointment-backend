import {
  IdentTypeIdPortDto,
  IdentTypeIdSchema,
} from '../../schemas/identification_type';
import { CustomError } from '../../errors';
import { RECORD_STATUS } from '../../../shared';
import { IdentificationType } from '../../entities';
import { IdentificationTypeRepository } from '../../../ports/repositories';

export class DeleteIdentificationTypeUseCase {
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

    const existingIdentType =
      await this.identTypeRepository.getIdentTypeById(parsedId);
    if (
      !existingIdentType ||
      existingIdentType.record_status === RECORD_STATUS.UNAVAILABLE
    ) {
      throw CustomError.notFound(
        'No se encontró el tipo de identificación a eliminar',
      );
    }

    const deletedIdentType =
      await this.identTypeRepository.deleteIdentType(parsedId);
    if (!deletedIdentType) {
      throw CustomError.internalServer(
        'No se pudo eliminar el tipo de identificación',
      );
    }

    return deletedIdentType;
  }
}
