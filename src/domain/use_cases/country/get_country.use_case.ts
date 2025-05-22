import { Country } from '../../entities';
import { CountryRepository } from '../../../ports/repositories';
import { CountryIdPortDto, CountryIdSchema } from '../../schemas/country';
import { CustomError } from '../../errors';

export class GetCountryUseCase {
  private readonly countryRepository: CountryRepository;

  constructor(countryRepository: CountryRepository) {
    this.countryRepository = countryRepository;
  }

  async execute(dto: CountryIdPortDto): Promise<Country> {
    const { success, error, data: schema } = CountryIdSchema.safeParse(dto);
    if (!success) {
      const message = error.errors[0]?.message || 'Datos inválidos';
      throw CustomError.badRequest(message);
    }

    const parsedSchema = {
      id: parseInt(schema.id, 10),
    };

    const country = await this.countryRepository.getCountryById(
      parsedSchema.id,
    );
    if (!country) {
      throw CustomError.notFound('No se ha encontrado el país deseado');
    }

    return country;
  }
}
