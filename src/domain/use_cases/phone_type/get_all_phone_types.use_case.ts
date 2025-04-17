import { PhoneType } from '../../entities';
import { PhoneTypeRepository } from '../../../adapters/repositories';
import { GetAllPhoneTypesDto } from '../../dtos/phone_type';

interface GetAllPhoneTypesUseCase {
  execute(getAllPhoneTypesDto: GetAllPhoneTypesDto): Promise<PhoneType[]>;
}

export class GetAllPhoneTypes implements GetAllPhoneTypesUseCase {
  private readonly phoneTypeRepository: PhoneTypeRepository;

  constructor(phoneTypeRepository: PhoneTypeRepository) {
    this.phoneTypeRepository = phoneTypeRepository;
  }

  async execute(
    getAllPhoneTypesDto: GetAllPhoneTypesDto,
  ): Promise<PhoneType[]> {
    return this.phoneTypeRepository.getAll(getAllPhoneTypesDto);
  }
}
