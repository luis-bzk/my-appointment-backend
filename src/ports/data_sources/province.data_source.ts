import { Province } from '../../domain/entities';
import {
  CreateProvinceDto,
  DeleteProvinceDto,
  GetAllProvincesDto,
  GetProvinceDto,
  UpdateProvinceDto,
} from '../../domain/dtos/province';

export abstract class ProvinceDataSource {
  abstract create(createProvinceDto: CreateProvinceDto): Promise<Province>;

  abstract update(updateProvinceDto: UpdateProvinceDto): Promise<Province>;

  abstract get(getProvinceDto: GetProvinceDto): Promise<Province>;

  abstract getAll(getAllProvinceDto: GetAllProvincesDto): Promise<Province[]>;

  abstract delete(deleteProvinceDto: DeleteProvinceDto): Promise<Province>;
}
