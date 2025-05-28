import { PhoneType } from '../../entities';
import { PhoneTypeRepository } from '../../../ports/repositories';
import {
  PhoneTypeIdPortDto,
  PhoneTypeIdSchema,
} from '../../schemas/phone_type';
import { CustomError } from '../../errors';
import { RECORD_STATUS } from '../../../shared';

export class DeletePhoneTypeUseCase {
  private readonly phoneTypeRepository: PhoneTypeRepository;

  constructor(phoneTypeRepository: PhoneTypeRepository) {
    this.phoneTypeRepository = phoneTypeRepository;
  }

  async execute(deletePhoneTypeDto: PhoneTypeIdPortDto): Promise<PhoneType> {
    const {
      success,
      error,
      data: schema,
    } = PhoneTypeIdSchema.safeParse(deletePhoneTypeDto);
    if (!success) {
      const message = error.errors[0]?.message || 'Datos inválidos';
      throw CustomError.badRequest(message);
    }

    const phoneTypeId = parseInt(schema.id, 10);

    const phoneType =
      await this.phoneTypeRepository.getPhoneTypeById(phoneTypeId);
    if (!phoneType || phoneType.record_status === RECORD_STATUS.UNAVAILABLE) {
      throw CustomError.notFound(
        'No se encontró un tipo de teléfono con el ID proporcionado',
      );
    }

    const deletedPhoneType =
      await this.phoneTypeRepository.deletePhoneType(phoneTypeId);
    if (!deletedPhoneType) {
      throw CustomError.internalServer(
        'No se pudo eliminar el tipo de teléfono',
      );
    }

    return deletedPhoneType;
  }
}
