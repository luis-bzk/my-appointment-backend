import { CountryMapper } from '../mappers';
import { Country } from '../../domain/entities';
import { CountryRepository } from '../../ports/repositories';
import { CountryDataSource } from '../../ports/data_sources';
import {
  CreateCountryDto,
  UpdateCountryDto,
} from '../../domain/schemas/country';
import { GetAllFiltersDto } from '../../domain/schemas/general';

export class CountryRepositoryImpl implements CountryRepository {
  private readonly countryDataSource: CountryDataSource;

  constructor(countryDataSource: CountryDataSource) {
    this.countryDataSource = countryDataSource;
  }

  async getCountryByName(name: string): Promise<Country | null> {
    const country = await this.countryDataSource.getCountryByName(name);
    return CountryMapper.entityFromObject(country);
  }

  async createCountry(
    createCountryDto: CreateCountryDto,
  ): Promise<Country | null> {
    const country =
      await this.countryDataSource.createCountry(createCountryDto);
    return CountryMapper.entityFromObject(country);
  }

  async getCountryById(id: number): Promise<Country | null> {
    const country = await this.countryDataSource.getCountryById(id);
    return CountryMapper.entityFromObject(country);
  }

  async getCountryByNameId(id: number, name: string): Promise<Country | null> {
    const country = await this.countryDataSource.getCountryByNameId(id, name);
    return CountryMapper.entityFromObject(country);
  }

  async updateCountry(
    updateCountryDto: UpdateCountryDto,
  ): Promise<Country | null> {
    const country =
      await this.countryDataSource.updateCountry(updateCountryDto);
    return CountryMapper.entityFromObject(country);
  }

  async getAllCountries(
    getAllCountriesDto: GetAllFiltersDto,
  ): Promise<Country[]> {
    const countries =
      await this.countryDataSource.getAllCountries(getAllCountriesDto);
    return CountryMapper.entitiesFromArray(countries);
  }

  async deleteCountry(id: number): Promise<Country | null> {
    const country = await this.countryDataSource.deleteCountry(id);
    return CountryMapper.entityFromObject(country);
  }
}
