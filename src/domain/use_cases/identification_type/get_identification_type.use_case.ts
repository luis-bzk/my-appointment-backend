import { IdentificationType } from '../../entities';
import { IdentificationTypeRepository } from '../../../adapters/repositories';
import { GetIdentTypeDto } from '../../dtos/identification_type';

interface GetIdentificationTypeUseCase {
  execute(getIdentTypeDto: GetIdentTypeDto): Promise<IdentificationType>;
}

export class GetIdentificationType implements GetIdentificationTypeUseCase {
  private readonly identificationTypeRepository: IdentificationTypeRepository;

  constructor(identificationTypeRepository: IdentificationTypeRepository) {
    this.identificationTypeRepository = identificationTypeRepository;
  }

  async execute(getIdentTypeDto: GetIdentTypeDto): Promise<IdentificationType> {
    return this.identificationTypeRepository.get(getIdentTypeDto);
  }
}
