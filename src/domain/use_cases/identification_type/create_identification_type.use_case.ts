import {
  CreateIdentTypeDto,
  CreateIdentTypeSchema,
} from '../../schemas/identification_type';
import { CustomError } from '../../errors';
import { IdentificationType } from '../../entities';
import { IdentificationTypeRepository } from '../../../ports/repositories';

export class CreateIdentificationTypeUseCase {
  private readonly identTypeRepository: IdentificationTypeRepository;

  constructor(identTypeRepository: IdentificationTypeRepository) {
    this.identTypeRepository = identTypeRepository;
  }

  async execute(
    createIdentTypeDto: CreateIdentTypeDto,
  ): Promise<IdentificationType> {
    const {
      success,
      error,
      data: schema,
    } = CreateIdentTypeSchema.safeParse(createIdentTypeDto);
    if (!success) {
      const errorMessage = error.errors[0].message || 'Datos inválidos';
      throw CustomError.badRequest(errorMessage);
    }

    const existingIdentType =
      await this.identTypeRepository.getIdentTypeByNameAndCountry(
        schema.name,
        schema.id_country,
      );
    if (existingIdentType) {
      throw CustomError.conflict(
        'Ya existe un tipo de identificación con el nombre ingresado',
      );
    }

    const createdIdentType =
      await this.identTypeRepository.createIdentType(schema);
    if (!createdIdentType) {
      throw CustomError.internalServer(
        'No se pudo crear el tipo de identificación',
      );
    }

    return createdIdentType;
  }
}
