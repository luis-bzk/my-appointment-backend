import {
  CreateCityDto,
  GetAllCitiesDto,
  UpdateCityDto,
} from '../../domain/schemas/city';
import { City } from '../../domain/entities';

export abstract class CityRepository {
  abstract getCityByNameAndProvince(
    name: string,
    id_province: number,
  ): Promise<City | null>;

  abstract createCity(createCityDto: CreateCityDto): Promise<City | null>;

  abstract getCityById(id: number): Promise<City | null>;

  abstract getCityByNameIdAndProvince(
    id: number,
    name: string,
    id_province: number,
  ): Promise<City | null>;

  abstract updateCity(updateCityDto: UpdateCityDto): Promise<City | null>;

  abstract getAllCities(getAllCitiesDto: GetAllCitiesDto): Promise<City[]>;

  abstract deleteCity(id: number): Promise<City | null>;
}
