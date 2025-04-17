import { DeletePhoneTypeDto } from '../../dtos/phone_type';
import { PhoneType } from '../../entities';
import { PhoneTypeRepository } from '../../../adapters/repositories';

interface DeletePhoneTypeUseCase {
  execute(deletePhoneTypeDto: DeletePhoneTypeDto): Promise<PhoneType>;
}

export class DeletePhoneType implements DeletePhoneTypeUseCase {
  private readonly phoneTypeRepository: PhoneTypeRepository;

  constructor(phoneTypeRepository: PhoneTypeRepository) {
    this.phoneTypeRepository = phoneTypeRepository;
  }

  async execute(deletePhoneTypeDto: DeletePhoneTypeDto): Promise<PhoneType> {
    return this.phoneTypeRepository.delete(deletePhoneTypeDto);
  }
}
