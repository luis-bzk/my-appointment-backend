import { Country } from '../entities';
import {
  CreateCountryDto,
  DeleteCountryDto,
  GetAllCountriesDto,
  GetCountryDto,
  UpdateCountryDto,
} from '../dtos/country';

export abstract class CountryRepository {
  abstract create(createCountryDto: CreateCountryDto): Promise<Country>;

  abstract update(updateCountryDto: UpdateCountryDto): Promise<Country>;

  abstract get(getCountryDto: GetCountryDto): Promise<Country>;

  abstract getAll(getAllCountriesDto: GetAllCountriesDto): Promise<Country[]>;

  abstract delete(deleteCountryDto: DeleteCountryDto): Promise<Country>;
}
