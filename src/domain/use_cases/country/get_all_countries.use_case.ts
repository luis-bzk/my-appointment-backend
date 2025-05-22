import { Country } from '../../entities';
import {
  GetAllFiltersDto,
  GetAllFiltersPortDto,
  GetAllFiltersSchema,
} from '../../schemas/general';
import { CustomError } from '../../errors';
import { CountryRepository } from '../../../ports/repositories';

export class GetAllCountriesUseCase {
  private readonly countryRepository: CountryRepository;

  constructor(countryRepository: CountryRepository) {
    this.countryRepository = countryRepository;
  }

  async execute(dto: GetAllFiltersPortDto): Promise<Country[]> {
    console.log({ dto });
    const { success, error, data: schema } = GetAllFiltersSchema.safeParse(dto);
    if (!success) {
      const message = error.errors[0]?.message || 'Datos inválidos';
      throw CustomError.badRequest(message);
    }

    const parsedSchema: GetAllFiltersDto = {
      ...schema,
      limit: schema.limit ? parseInt(schema.limit ?? '', 10) : 50,
      offset: schema.offset ? parseInt(schema.offset ?? '', 10) : undefined,
    };

    return await this.countryRepository.getAllCountries(parsedSchema);
  }
}
