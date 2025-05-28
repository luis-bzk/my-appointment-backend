import { PhoneType } from '../../entities';
import { PhoneTypeRepository } from '../../../ports/repositories';
import {
  GetAllFiltersDto,
  GetAllFiltersPortDto,
  GetAllFiltersSchema,
} from '../../schemas/general';
import { CustomError } from '../../errors';

export class GetAllPhoneTypesUseCase {
  private readonly phoneTypeRepository: PhoneTypeRepository;

  constructor(phoneTypeRepository: PhoneTypeRepository) {
    this.phoneTypeRepository = phoneTypeRepository;
  }

  async execute(dto: GetAllFiltersPortDto): Promise<PhoneType[]> {
    const { success, error, data: schema } = GetAllFiltersSchema.safeParse(dto);
    if (!success) {
      const errorMessage = error.errors[0].message || 'Datos inválidos';
      throw CustomError.badRequest(errorMessage);
    }

    const parsedSchema: GetAllFiltersDto = {
      ...schema,
      limit: schema.limit ? parseInt(schema.limit ?? '', 10) : 50,
      offset: schema.offset ? parseInt(schema.offset ?? '', 10) : undefined,
    };

    const phoneTypes =
      await this.phoneTypeRepository.getAllPhoneTypes(parsedSchema);

    return phoneTypes;
  }
}
