import { IdentificationType } from '../../entities';
import { IdentificationTypeRepository } from '../../../ports/repositories';
import { UpdateIdentTypeDto } from '../../dtos/identification_type';

interface UpdateIdentificationTypeUseCase {
  execute(updateIdentTypeDto: UpdateIdentTypeDto): Promise<IdentificationType>;
}

export class UpdateIdentificationType
  implements UpdateIdentificationTypeUseCase
{
  private readonly identificationTypeRepository: IdentificationTypeRepository;

  constructor(identificationTypeRepository: IdentificationTypeRepository) {
    this.identificationTypeRepository = identificationTypeRepository;
  }

  async execute(
    updateIdentTypeDto: UpdateIdentTypeDto,
  ): Promise<IdentificationType> {
    return this.identificationTypeRepository.update(updateIdentTypeDto);
  }
}
