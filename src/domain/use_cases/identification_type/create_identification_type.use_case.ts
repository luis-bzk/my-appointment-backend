import { IdentificationType } from '../../entities';
import { IdentificationTypeRepository } from '../../repositories';
import { CreateIdentTypeDto } from '../../dtos/identification_type';

interface CreateIdentificationTypeUseCase {
  execute(createIdentTypeDto: CreateIdentTypeDto): Promise<IdentificationType>;
}

export class CreateIdentificationType
  implements CreateIdentificationTypeUseCase
{
  private readonly identificationTypeRepository: IdentificationTypeRepository;

  constructor(identificationTypeRepository: IdentificationTypeRepository) {
    this.identificationTypeRepository = identificationTypeRepository;
  }

  async execute(
    createIdentTypeDto: CreateIdentTypeDto,
  ): Promise<IdentificationType> {
    return this.identificationTypeRepository.create(createIdentTypeDto);
  }
}
