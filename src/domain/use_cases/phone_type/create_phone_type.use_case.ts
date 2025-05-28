import {
  CreatePhoneTypeDto,
  CreatePhoneTypeSchema,
} from '../../schemas/phone_type';
import { CustomError } from '../../errors';
import { PhoneType } from '../../entities';
import { PhoneTypeRepository } from '../../../ports/repositories';

export class CreatePhoneTypeUseCase {
  private readonly phoneTypeRepository: PhoneTypeRepository;

  constructor(phoneTypeRepository: PhoneTypeRepository) {
    this.phoneTypeRepository = phoneTypeRepository;
  }

  async execute(createPhoneTypeDto: CreatePhoneTypeDto): Promise<PhoneType> {
    const {
      success,
      error,
      data: schema,
    } = CreatePhoneTypeSchema.safeParse(createPhoneTypeDto);
    if (!success) {
      const errorMessage = error.errors[0].message || 'Datos inválidos';
      throw CustomError.badRequest(errorMessage);
    }

    const existingPhoneType = await this.phoneTypeRepository.getPhoneTypeByName(
      schema.name,
    );
    if (existingPhoneType) {
      throw CustomError.conflict(
        'Ya existe un tipo de teléfono con el nombre ingresado',
      );
    }

    const createdPhoneType =
      await this.phoneTypeRepository.createPhoneType(schema);
    if (!createdPhoneType) {
      throw CustomError.internalServer('No se pudo crear el tipo de teléfono');
    }

    return createdPhoneType;
  }
}
