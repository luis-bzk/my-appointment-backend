import { Country } from '../../entities';
import { CountryRepository } from '../../repositories';
import { GetAllCountriesDto } from '../../dtos/country';

interface GetAllCountriesUseCase {
  execute(getAllCountriesDto: GetAllCountriesDto): Promise<Country[]>;
}

export class GetAllCountries implements GetAllCountriesUseCase {
  private readonly countryRepository: CountryRepository;

  constructor(countryRepository: CountryRepository) {
    this.countryRepository = countryRepository;
  }

  async execute(getAllCountriesDto: GetAllCountriesDto): Promise<Country[]> {
    return await this.countryRepository.getAll(getAllCountriesDto);
  }
}
