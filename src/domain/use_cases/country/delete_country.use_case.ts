import { Country } from '../../entities';
import { DeleteCountryDto } from '../../dtos/country';
import { CountryRepository } from '../../repositories';

interface DeleteCountryUseCase {
  execute(deleteCountryDto: DeleteCountryDto): Promise<Country>;
}

export class DeleteCountry implements DeleteCountryUseCase {
  private readonly countryRepository: CountryRepository;

  constructor(countryRepository: CountryRepository) {
    this.countryRepository = countryRepository;
  }

  async execute(deleteCountryDto: DeleteCountryDto): Promise<Country> {
    return await this.countryRepository.delete(deleteCountryDto);
  }
}
