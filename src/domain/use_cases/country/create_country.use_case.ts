import { Country } from '../../entities';
import { CountryRepository } from '../../../ports/repositories';
import { CreateCountryDto, CreateCountrySchema } from '../../schemas/country';
import { CustomError } from '../../errors';

export class CreateCountryUseCase {
  private readonly countryRepository: CountryRepository;

  constructor(countryRepository: CountryRepository) {
    this.countryRepository = countryRepository;
  }

  async execute(createCountryDto: CreateCountryDto): Promise<Country> {
    const {
      success,
      error,
      data: schema,
    } = CreateCountrySchema.safeParse(createCountryDto);
    if (!success) {
      const message = error.errors[0]?.message || 'Datos inválidos';
      throw CustomError.badRequest(message);
    }

    const countryName = await this.countryRepository.getCountryByName(
      schema.name.toLowerCase(),
    );
    if (countryName) {
      throw CustomError.conflict('Ya existe un país con el nombre ingresado');
    }

    const createdCountry = await this.countryRepository.createCountry(schema);
    if (!createdCountry) {
      throw CustomError.internalServer('No se pudo crear el país');
    }

    return createdCountry;
  }
}
