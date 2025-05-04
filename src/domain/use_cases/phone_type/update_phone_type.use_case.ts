import { UpdatePhoneTypeDto } from '../../dtos/phone_type';
import { PhoneType } from '../../entities';
import { PhoneTypeRepository } from '../../../ports/repositories';

interface UpdatePhoneTypeUseCase {
  execute(updatePhoneTypeDto: UpdatePhoneTypeDto): Promise<PhoneType>;
}

export class UpdatePhoneType implements UpdatePhoneTypeUseCase {
  private readonly phoneTypeRepository: PhoneTypeRepository;

  constructor(phoneTypeRepository: PhoneTypeRepository) {
    this.phoneTypeRepository = phoneTypeRepository;
  }

  async execute(updatePhoneTypeDto: UpdatePhoneTypeDto): Promise<PhoneType> {
    return this.phoneTypeRepository.update(updatePhoneTypeDto);
  }
}
