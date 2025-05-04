import { PhoneType } from '../../entities';
import { PhoneTypeRepository } from '../../../ports/repositories';
import { CreatePhoneTypeDto } from '../../dtos/phone_type';

interface CreatePhoneTypeUseCase {
  execute(createPhoneTypeDto: CreatePhoneTypeDto): Promise<PhoneType>;
}

export class CreatePhoneType implements CreatePhoneTypeUseCase {
  private readonly phoneTypeRepository: PhoneTypeRepository;

  constructor(phoneTypeRepository: PhoneTypeRepository) {
    this.phoneTypeRepository = phoneTypeRepository;
  }

  async execute(createPhoneTypeDto: CreatePhoneTypeDto): Promise<PhoneType> {
    return this.phoneTypeRepository.create(createPhoneTypeDto);
  }
}
