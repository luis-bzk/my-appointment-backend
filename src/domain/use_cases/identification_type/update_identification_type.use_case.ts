import { IdentificationType } from '../../entities';
import { IdentificationTypeRepository } from '../../../ports/repositories';
import {
  UpdateIdentTypeDto,
  UpdateIdentTypePortDto,
  UpdateIdentTypeSchema,
} from '../../schemas/identification_type';
import { CustomError } from '../../errors';
import { RECORD_STATUS } from '../../../shared';

export class UpdateIdentificationTypeUseCase {
  private readonly identTypeRepository: IdentificationTypeRepository;

  constructor(identTypeRepository: IdentificationTypeRepository) {
    this.identTypeRepository = identTypeRepository;
  }

  async execute(dto: UpdateIdentTypePortDto): Promise<IdentificationType> {
    const {
      success,
      error,
      data: schema,
    } = UpdateIdentTypeSchema.safeParse(dto);
    if (!success) {
      const errorMessage = error.errors[0].message || 'Datos inválidos';
      throw CustomError.badRequest(errorMessage);
    }
    const parsedSchema: UpdateIdentTypeDto = {
      ...schema,
      id: parseInt(schema.id, 10),
    };

    const existingIdentType = await this.identTypeRepository.getIdentTypeById(
      parsedSchema.id,
    );
    if (
      !existingIdentType ||
      existingIdentType.record_status === RECORD_STATUS.UNAVAILABLE
    ) {
      throw CustomError.notFound(
        'No se encontró el tipo de identificación a actualizar',
      );
    }

    const identTypeNameId =
      await this.identTypeRepository.getIdentTypeByNameIdAndCountry(
        parsedSchema.id,
        parsedSchema.name,
        parsedSchema.id_country,
      );
    if (identTypeNameId) {
      throw CustomError.conflict(
        'Ya existe un tipo de identificación con el nombre ingresado',
      );
    }

    const updatedIdentType =
      await this.identTypeRepository.updateIdentType(parsedSchema);
    if (!updatedIdentType) {
      throw CustomError.internalServer(
        'No se pudo actualizar el tipo de identificación',
      );
    }
    return updatedIdentType;
  }
}
