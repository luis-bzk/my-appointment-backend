import { Province } from '../../entities';
import { ProvinceRepository } from '../../../ports/repositories';
import {
  GetAllProvincesDto,
  GetAllProvincesPortDto,
  GetAllProvincesSchema,
} from '../../schemas/province';
import { CustomError } from '../../errors';

export class GetAllProvincesUseCase {
  private readonly provinceRepository: ProvinceRepository;

  constructor(provinceRepository: ProvinceRepository) {
    this.provinceRepository = provinceRepository;
  }

  async execute(dto: GetAllProvincesPortDto): Promise<Province[]> {
    const {
      success,
      error,
      data: schema,
    } = GetAllProvincesSchema.safeParse(dto);
    if (!success) {
      const message = error.errors[0]?.message || 'Datos inválidos';
      throw CustomError.badRequest(message);
    }

    const schemaParse: GetAllProvincesDto = {
      ...schema,
      id_country: schema.id_country
        ? parseInt(schema.id_country, 10)
        : undefined,
      limit: schema.limit ? parseInt(schema.limit ?? '', 10) : undefined,
      offset: schema.offset ? parseInt(schema.offset ?? '', 10) : undefined,
    };

    return await this.provinceRepository.getAllProvinces(schemaParse);
  }
}
