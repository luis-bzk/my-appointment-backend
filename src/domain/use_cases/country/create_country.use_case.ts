import { Country } from '../../entities';
import { CreateCountryDto } from '../../dtos/country';
import { CountryRepository } from '../../repositories';

interface CreateCountryUseCase {
  execute(createCountryDto: CreateCountryDto): Promise<Country>;
}

export class CreateCountry implements CreateCountryUseCase {
  private readonly countryRepository: CountryRepository;

  constructor(countryRepository: CountryRepository) {
    this.countryRepository = countryRepository;
  }

  async execute(createCountryDto: CreateCountryDto): Promise<Country> {
    return await this.countryRepository.create(createCountryDto);
  }
}
