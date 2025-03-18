import { Country } from '../../entities';
import { UpdateCountryDto } from '../../dtos/country';
import { CountryRepository } from '../../repositories';

interface UpdateCountryUseCase {
  execute(updateCountryDto: UpdateCountryDto): Promise<Country>;
}

export class UpdateCountry implements UpdateCountryUseCase {
  private readonly countryRepository: CountryRepository;

  constructor(countryRepository: CountryRepository) {
    this.countryRepository = countryRepository;
  }

  async execute(updateCountryDto: UpdateCountryDto): Promise<Country> {
    return await this.countryRepository.update(updateCountryDto);
  }
}
