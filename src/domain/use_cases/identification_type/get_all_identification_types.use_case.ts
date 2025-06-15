import {
  GetAllIdentTypesDto,
  GetAllIdentTypesPortDto,
  GetAllIdentTypesSchema,
} from '../../schemas/identification_type';
import { IdentificationType } from '../../entities';
import { IdentificationTypeRepository } from '../../../ports/repositories';

export class GetAllIdentificationTypesUseCase {
  private readonly identTypeRepository: IdentificationTypeRepository;

  constructor(identTypeRepository: IdentificationTypeRepository) {
    this.identTypeRepository = identTypeRepository;
  }

  async execute(
    getAllIdentTypesDto: GetAllIdentTypesPortDto,
  ): Promise<IdentificationType[]> {
    const {
      success,
      error,
      data: schema,
    } = GetAllIdentTypesSchema.safeParse(getAllIdentTypesDto);
    if (!success) {
      const errorMessage = error.errors[0].message || 'Datos inválidos';
      throw new Error(errorMessage);
    }

    const parsedSchema: GetAllIdentTypesDto = {
      ...schema,
      id_country: schema.id_country
        ? parseInt(schema.id_country, 10)
        : undefined,
      limit: schema.limit ? parseInt(schema.limit ?? '', 10) : undefined,
      offset: schema.offset ? parseInt(schema.offset ?? '', 10) : undefined,
    };

    const identTypes =
      await this.identTypeRepository.getAllIdentTypes(parsedSchema);

    return identTypes;
  }
}
