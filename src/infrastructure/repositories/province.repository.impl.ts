import { Province } from '../../domain/entities';
import { ProvinceRepository } from '../../domain/repositories';
import { ProvinceDataSource } from '../../domain/data_sources';
import {
  CreateProvinceDto,
  DeleteProvinceDto,
  GetAllProvincesDto,
  GetProvinceDto,
  UpdateProvinceDto,
} from '../../domain/dtos/province';

export class ProvinceRepositoryImpl implements ProvinceRepository {
  private readonly provinceDataSource: ProvinceDataSource;

  constructor(provinceDataSource: ProvinceDataSource) {
    this.provinceDataSource = provinceDataSource;
  }

  create(createProvinceDto: CreateProvinceDto): Promise<Province> {
    return this.provinceDataSource.create(createProvinceDto);
  }

  update(updateProvinceDto: UpdateProvinceDto): Promise<Province> {
    return this.provinceDataSource.update(updateProvinceDto);
  }

  get(getProvinceDto: GetProvinceDto): Promise<Province> {
    return this.provinceDataSource.get(getProvinceDto);
  }

  getAll(getAllProvinceDto: GetAllProvincesDto): Promise<Province[]> {
    return this.provinceDataSource.getAll(getAllProvinceDto);
  }

  delete(deleteProvinceDto: DeleteProvinceDto): Promise<Province> {
    return this.provinceDataSource.delete(deleteProvinceDto);
  }
}
