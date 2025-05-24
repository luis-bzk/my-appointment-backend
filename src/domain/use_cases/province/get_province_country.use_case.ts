import { Province } from '../../entities';
import { CustomError } from '../../errors';
import { ProvinceRepository } from '../../../ports/repositories';
import {
  ProvinceCountryDto,
  ProvinceCountrySchema,
} from '../../schemas/province';

export class GetProvinceCountryUseCase {
  private readonly provinceRepository: ProvinceRepository;

  constructor(provinceRepository: ProvinceRepository) {
    this.provinceRepository = provinceRepository;
  }

  async execute(dto: ProvinceCountryDto): Promise<Province> {
    const {
      success,
      error,
      data: schema,
    } = ProvinceCountrySchema.safeParse(dto);
    if (!success) {
      const message = error.errors[0]?.message || 'Datos inválidos';
      throw CustomError.badRequest(message);
    }

    const province = await this.provinceRepository.getProvinceByIdAndCountry(
      schema.id_province,
      schema.id_country,
    );
    if (!province) {
      throw CustomError.notFound('No se ha encontrado la provincia solicitada');
    }

    return province;
  }
}
