import { CityDB } from '../../data/interfaces';
import {
  CreateCityDto,
  GetAllCitiesDto,
  UpdateCityDto,
} from '../../domain/schemas/city';

export abstract class CityDataSource {
  abstract getCityByNameAndProvince(
    name: string,
    id_province: number,
  ): Promise<CityDB | null>;

  abstract createCity(createCityDto: CreateCityDto): Promise<CityDB | null>;

  abstract getCityById(id: number): Promise<CityDB | null>;

  abstract getCityByNameIdAndProvince(
    id: number,
    name: string,
    id_province: number,
  ): Promise<CityDB | null>;

  abstract updateCity(updateCityDto: UpdateCityDto): Promise<CityDB | null>;

  abstract getAllCities(getAllCitiesDto: GetAllCitiesDto): Promise<CityDB[]>;

  abstract deleteCity(id: number): Promise<CityDB | null>;
}
