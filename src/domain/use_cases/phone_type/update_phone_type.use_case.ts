import { PhoneType } from '../../entities';
import { PhoneTypeRepository } from '../../../ports/repositories';
import {
  UpdatePhoneTypeDto,
  UpdatePhoneTypePortDto,
  UpdatePhoneTypeSchema,
} from '../../schemas/phone_type';
import { CustomError } from '../../errors';
import { RECORD_STATUS } from '../../../shared';

export class UpdatePhoneTypeUseCase {
  private readonly phoneTypeRepository: PhoneTypeRepository;

  constructor(phoneTypeRepository: PhoneTypeRepository) {
    this.phoneTypeRepository = phoneTypeRepository;
  }

  async execute(
    updatePhoneTypeDto: UpdatePhoneTypePortDto,
  ): Promise<PhoneType> {
    const {
      success,
      error,
      data: schema,
    } = UpdatePhoneTypeSchema.safeParse(updatePhoneTypeDto);
    if (!success) {
      const errorMessage = error.errors[0].message || 'Datos inválidos';
      throw CustomError.badRequest(errorMessage);
    }

    const parsedSchema: UpdatePhoneTypeDto = {
      ...schema,
      id: parseInt(schema.id, 10),
    };

    const existingPhoneType = await this.phoneTypeRepository.getPhoneTypeById(
      parsedSchema.id,
    );
    if (
      !existingPhoneType ||
      existingPhoneType.record_status === RECORD_STATUS.UNAVAILABLE
    ) {
      throw CustomError.notFound(
        'No se encontró un tipo de teléfono con el ID proporcionado',
      );
    }

    const existingPhoneTypeByName =
      await this.phoneTypeRepository.getPhoneTypeByNameId(
        parsedSchema.id,
        parsedSchema.name,
      );
    if (existingPhoneTypeByName) {
      throw CustomError.conflict(
        'Ya existe un tipo de teléfono con el nombre ingresado',
      );
    }

    const updatedPhoneType =
      await this.phoneTypeRepository.updatePhoneType(parsedSchema);
    if (!updatedPhoneType) {
      throw CustomError.internalServer(
        'No se pudo actualizar el tipo de teléfono',
      );
    }

    return updatedPhoneType;
  }
}
