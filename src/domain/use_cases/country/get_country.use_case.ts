import { GetCountryDto } from '../../dtos/country';
import { Country } from '../../entities';
import { CountryRepository } from '../../repositories';

interface GetCountryUseCase {
  execute(getCountyDto: GetCountryDto): Promise<Country>;
}

export class GetCountry implements GetCountryUseCase {
  private readonly countryRepository: CountryRepository;

  constructor(countryRepository: CountryRepository) {
    this.countryRepository = countryRepository;
  }

  async execute(getCountyDto: GetCountryDto): Promise<Country> {
    return await this.countryRepository.get(getCountyDto);
  }
}
