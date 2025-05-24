import { City } from '../../domain/entities';
import { CityRepository } from '../../ports/repositories';
import { CityDataSource } from '../../ports/data_sources';
import {
  CreateCityDto,
  GetAllCitiesDto,
  UpdateCityDto,
} from '../../domain/schemas/city';
import { CityMapper } from '../mappers';

export class CityRepositoryImpl implements CityRepository {
  private readonly cityDataSource: CityDataSource;

  constructor(cityDataSource: CityDataSource) {
    this.cityDataSource = cityDataSource;
  }

  async getCityByNameAndProvince(
    name: string,
    id_province: number,
  ): Promise<City | null> {
    const city = await this.cityDataSource.getCityByNameAndProvince(
      name,
      id_province,
    );
    return CityMapper.entityFromObject(city);
  }

  async createCity(createCityDto: CreateCityDto): Promise<City | null> {
    const cityCreated = await this.cityDataSource.createCity(createCityDto);
    return CityMapper.entityFromObject(cityCreated);
  }

  async getCityById(id: number): Promise<City | null> {
    const city = await this.cityDataSource.getCityById(id);
    return CityMapper.entityFromObject(city);
  }
  async getCityByNameIdAndProvince(
    id: number,
    name: string,
    id_province: number,
  ): Promise<City | null> {
    const city = await this.cityDataSource.getCityByNameIdAndProvince(
      id,
      name,
      id_province,
    );
    return CityMapper.entityFromObject(city);
  }

  async updateCity(updateCityDto: UpdateCityDto): Promise<City | null> {
    const cityUpdated = await this.cityDataSource.updateCity(updateCityDto);
    return CityMapper.entityFromObject(cityUpdated);
  }

  async getAllCities(getAllCitiesDto: GetAllCitiesDto): Promise<City[]> {
    const cities = await this.cityDataSource.getAllCities(getAllCitiesDto);
    return CityMapper.entitiesFromArray(cities);
  }

  async deleteCity(id: number): Promise<City | null> {
    const cityDeleted = await this.cityDataSource.deleteCity(id);
    return CityMapper.entityFromObject(cityDeleted);
  }
}
