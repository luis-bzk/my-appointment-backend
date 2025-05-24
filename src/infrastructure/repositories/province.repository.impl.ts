import { Province } from '../../domain/entities';
import { ProvinceRepository } from '../../ports/repositories';
import { ProvinceDataSource } from '../../ports/data_sources';
import { ProvinceMapper } from '../mappers';
import {
  CreateProvinceDto,
  GetAllProvincesDto,
  UpdateProvinceDto,
} from '../../domain/schemas/province';

export class ProvinceRepositoryImpl implements ProvinceRepository {
  private readonly provinceDataSource: ProvinceDataSource;

  constructor(provinceDataSource: ProvinceDataSource) {
    this.provinceDataSource = provinceDataSource;
  }

  async getProvinceByName(
    name: string,
    id_country: number,
  ): Promise<Province | null> {
    const province = await this.provinceDataSource.getProvinceByName(
      name,
      id_country,
    );
    return ProvinceMapper.entityFromObject(province);
  }

  async createProvince(
    createProvinceDto: CreateProvinceDto,
  ): Promise<Province | null> {
    const province =
      await this.provinceDataSource.createProvince(createProvinceDto);
    return ProvinceMapper.entityFromObject(province);
  }

  async getProvinceById(id: number): Promise<Province | null> {
    const province = await this.provinceDataSource.getProvinceById(id);
    return ProvinceMapper.entityFromObject(province);
  }

  async getProvinceByIdName(
    id: number,
    name: string,
    id_country: number,
  ): Promise<Province | null> {
    const province = await this.provinceDataSource.getProvinceByIdName(
      id,
      name,
      id_country,
    );

    return ProvinceMapper.entityFromObject(province);
  }

  async updateProvince(
    updateProvinceDto: UpdateProvinceDto,
  ): Promise<Province | null> {
    const province =
      await this.provinceDataSource.updateProvince(updateProvinceDto);
    return ProvinceMapper.entityFromObject(province);
  }

  async getAllProvinces(
    getAllProvincesDto: GetAllProvincesDto,
  ): Promise<Province[]> {
    const provinces =
      await this.provinceDataSource.getAllProvinces(getAllProvincesDto);
    return ProvinceMapper.entitiesFromArray(provinces);
  }

  async deleteProvince(provinceId: number): Promise<Province | null> {
    const deletedProvince =
      await this.provinceDataSource.deleteProvince(provinceId);
    return ProvinceMapper.entityFromObject(deletedProvince);
  }

  async getProvinceByIdAndCountry(
    id_province: number,
    id_country: number,
  ): Promise<Province | null> {
    const province = await this.provinceDataSource.getProvinceByIdAndCountry(
      id_province,
      id_country,
    );

    return ProvinceMapper.entityFromObject(province);
  }
}
