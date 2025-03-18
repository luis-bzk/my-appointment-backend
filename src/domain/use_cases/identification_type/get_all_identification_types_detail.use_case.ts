import { IdentificationTypeDetail } from '../../entities';
import { IdentificationTypeRepository } from '../../repositories';
import { GetAllIdentTypesDto } from '../../dtos/identification_type';

interface GetAllIdentificationTypesDetailUseCase {
  execute(
    getAllIdentTypesDetailDto: GetAllIdentTypesDto,
  ): Promise<IdentificationTypeDetail[]>;
}

export class GetAllIdentificationTypesDetail
  implements GetAllIdentificationTypesDetailUseCase
{
  private readonly identificationTypeRepository: IdentificationTypeRepository;

  constructor(identificationTypeRepository: IdentificationTypeRepository) {
    this.identificationTypeRepository = identificationTypeRepository;
  }

  async execute(
    getAllIdentTypesDetailDto: GetAllIdentTypesDto,
  ): Promise<IdentificationTypeDetail[]> {
    return this.identificationTypeRepository.getAllDetail(
      getAllIdentTypesDetailDto,
    );
  }
}
