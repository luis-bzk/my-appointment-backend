import {
  CreateProvinceDto,
  GetAllProvincesDto,
  UpdateProvinceDto,
} from '../../domain/schemas/province';
import { ProvinceDB } from '../../data/interfaces';

export abstract class ProvinceDataSource {
  abstract getProvinceByName(
    name: string,
    id_country: number,
  ): Promise<ProvinceDB | null>;

  abstract createProvince(
    createProvinceDto: CreateProvinceDto,
  ): Promise<ProvinceDB | null>;

  abstract getProvinceById(id: number): Promise<ProvinceDB | null>;

  abstract getProvinceByIdName(
    id: number,
    name: string,
    id_country: number,
  ): Promise<ProvinceDB | null>;

  abstract updateProvince(
    updateProvinceDto: UpdateProvinceDto,
  ): Promise<ProvinceDB | null>;

  abstract getAllProvinces(
    getAllProvincesDto: GetAllProvincesDto,
  ): Promise<ProvinceDB[]>;

  abstract deleteProvince(provinceId: number): Promise<ProvinceDB | null>;
}
