import { Country } from '../../domain/entities';
import {
  CreateCountryDto,
  UpdateCountryDto,
} from '../../domain/schemas/country';
import { GetAllFiltersDto } from '../../domain/schemas/general';

export abstract class CountryRepository {
  abstract getCountryByName(name: string): Promise<Country | null>;

  abstract createCountry(
    createCountryDto: CreateCountryDto,
  ): Promise<Country | null>;

  abstract getCountryById(id: number): Promise<Country | null>;

  abstract getCountryByNameId(
    id: number,
    name: string,
  ): Promise<Country | null>;

  abstract updateCountry(
    updateCountryDto: UpdateCountryDto,
  ): Promise<Country | null>;

  abstract getAllCountries(
    getAllCountriesDto: GetAllFiltersDto,
  ): Promise<Country[]>;

  abstract deleteCountry(id: number): Promise<Country | null>;
}
