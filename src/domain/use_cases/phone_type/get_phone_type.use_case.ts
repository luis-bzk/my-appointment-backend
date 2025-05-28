import { PhoneType } from '../../entities';
import { PhoneTypeRepository } from '../../../ports/repositories';
import {
  PhoneTypeIdPortDto,
  PhoneTypeIdSchema,
} from '../../schemas/phone_type';
import { CustomError } from '../../errors';

export class GetPhoneTypeUseCase {
  private readonly phoneTypeRepository: PhoneTypeRepository;

  constructor(phoneTypeRepository: PhoneTypeRepository) {
    this.phoneTypeRepository = phoneTypeRepository;
  }

  async execute(getPhoneTypeDto: PhoneTypeIdPortDto): Promise<PhoneType> {
    const {
      success,
      error,
      data: schema,
    } = PhoneTypeIdSchema.safeParse(getPhoneTypeDto);
    if (!success) {
      const message = error.errors[0]?.message || 'Datos inválidos';
      throw CustomError.badRequest(message);
    }

    const phoneTypeId = parseInt(schema.id, 10);

    const phoneType =
      await this.phoneTypeRepository.getPhoneTypeById(phoneTypeId);
    if (!phoneType) {
      throw CustomError.notFound(
        'No se encontró un tipo de teléfono con el ID proporcionado',
      );
    }

    return phoneType;
  }
}
