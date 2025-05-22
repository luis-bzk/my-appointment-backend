import { CountryDB } from '../../data/interfaces';
import {
  CreateCountryDto,
  UpdateCountryDto,
} from '../../domain/schemas/country';
import { GetAllFiltersDto } from '../../domain/schemas/general';

export abstract class CountryDataSource {
  abstract getCountryByName(name: string): Promise<CountryDB | null>;

  abstract createCountry(
    createCountryDto: CreateCountryDto,
  ): Promise<CountryDB | null>;

  abstract getCountryById(id: number): Promise<CountryDB | null>;

  abstract getCountryByNameId(
    id: number,
    name: string,
  ): Promise<CountryDB | null>;

  abstract updateCountry(
    updateCountryDto: UpdateCountryDto,
  ): Promise<CountryDB | null>;

  abstract getAllCountries(
    getAllCountriesDto: GetAllFiltersDto,
  ): Promise<CountryDB[]>;

  abstract deleteCountry(id: number): Promise<CountryDB | null>;
}
