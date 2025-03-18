import { DeleteIdentTypeDto } from '../../dtos/identification_type';
import { IdentificationType } from '../../entities';
import { IdentificationTypeRepository } from '../../repositories';

interface DeleteIdentificationTypeUseCase {
  execute(deleteIdentTypeDto: DeleteIdentTypeDto): Promise<IdentificationType>;
}

export class DeleteIdentificationType
  implements DeleteIdentificationTypeUseCase
{
  private readonly identificationTypeRepository: IdentificationTypeRepository;

  constructor(identificationTypeRepository: IdentificationTypeRepository) {
    this.identificationTypeRepository = identificationTypeRepository;
  }

  async execute(
    deleteIdentTypeDto: DeleteIdentTypeDto,
  ): Promise<IdentificationType> {
    return this.identificationTypeRepository.delete(deleteIdentTypeDto);
  }
}
