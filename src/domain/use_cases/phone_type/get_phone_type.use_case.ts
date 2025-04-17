import { GetPhoneTypeDto } from '../../dtos/phone_type';
import { PhoneType } from '../../entities';
import { PhoneTypeRepository } from '../../../adapters/repositories';

interface GetPhoneTypeUseCase {
  execute(getPhoneTypeDto: GetPhoneTypeDto): Promise<PhoneType>;
}

export class GetPhoneType implements GetPhoneTypeUseCase {
  private readonly phoneTypeRepository: PhoneTypeRepository;

  constructor(phoneTypeRepository: PhoneTypeRepository) {
    this.phoneTypeRepository = phoneTypeRepository;
  }

  async execute(getPhoneTypeDto: GetPhoneTypeDto): Promise<PhoneType> {
    return this.phoneTypeRepository.get(getPhoneTypeDto);
  }
}
