import {
  CreateCityDto,
  DeleteCityDto,
  GetAllCitiesDto,
  GetCityDto,
  UpdateCityDto,
} from '../../domain/dtos/city';
import { City } from '../../domain/entities';

export abstract class CityRepository {
  abstract create(createCityDto: CreateCityDto): Promise<City>;

  abstract update(updateCityDto: UpdateCityDto): Promise<City>;

  abstract get(getCityDto: GetCityDto): Promise<City>;

  abstract getAll(getAllCitiesDto: GetAllCitiesDto): Promise<City[]>;

  abstract delete(deleteCityDto: DeleteCityDto): Promise<City>;
}
