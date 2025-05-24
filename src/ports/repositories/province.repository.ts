import { Province } from '../../domain/entities';
import {
  CreateProvinceDto,
  GetAllProvincesDto,
  UpdateProvinceDto,
} from '../../domain/schemas/province';

export abstract class ProvinceRepository {
  abstract getProvinceByName(
    name: string,
    id_country: number,
  ): Promise<Province | null>;

  abstract createProvince(
    createProvinceDto: CreateProvinceDto,
  ): Promise<Province | null>;

  abstract getProvinceById(id: number): Promise<Province | null>;

  abstract getProvinceByIdName(
    id: number,
    name: string,
    id_country: number,
  ): Promise<Province | null>;

  abstract updateProvince(
    updateProvinceDto: UpdateProvinceDto,
  ): Promise<Province | null>;

  abstract getAllProvinces(
    getAllProvincesDto: GetAllProvincesDto,
  ): Promise<Province[]>;

  abstract deleteProvince(provinceId: number): Promise<Province | null>;

  abstract getProvinceByIdAndCountry(
    id_province: number,
    id_country: number,
  ): Promise<Province | null>;
}
