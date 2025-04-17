import {
  CreateCityDto,
  DeleteCityDto,
  GetAllCitiesDto,
  GetCityDto,
  UpdateCityDto,
} from '../../domain/dtos/city';
import { City } from '../../domain/entities';
import { CityRepository } from '../../adapters/repositories';
import { CityDataSource } from '../../adapters/data_sources';

export class CityRepositoryImpl implements CityRepository {
  private readonly cityDataSource: CityDataSource;

  constructor(cityDataSource: CityDataSource) {
    this.cityDataSource = cityDataSource;
  }

  create(createCityDto: CreateCityDto): Promise<City> {
    return this.cityDataSource.create(createCityDto);
  }

  update(updateCityDto: UpdateCityDto): Promise<City> {
    return this.cityDataSource.update(updateCityDto);
  }

  get(getCityDto: GetCityDto): Promise<City> {
    return this.cityDataSource.get(getCityDto);
  }

  getAll(getAllCitiesDto: GetAllCitiesDto): Promise<City[]> {
    return this.cityDataSource.getAll(getAllCitiesDto);
  }

  delete(deleteCityDto: DeleteCityDto): Promise<City> {
    return this.cityDataSource.delete(deleteCityDto);
  }
}
