import { Province } from '../../entities';
import { ProvinceRepository } from '../../../ports/repositories';
import {
  CreateProvinceDto,
  CreateProvinceSchema,
} from '../../schemas/province';
import { CustomError } from '../../errors';

export class CreateProvinceUseCase {
  private readonly provinceRepository: ProvinceRepository;

  constructor(provinceRepository: ProvinceRepository) {
    this.provinceRepository = provinceRepository;
  }

  async execute(dto: CreateProvinceDto): Promise<Province> {
    const {
      success,
      error,
      data: schema,
    } = CreateProvinceSchema.safeParse(dto);
    if (!success) {
      const message = error.errors[0]?.message || 'Datos inválidos';
      throw CustomError.badRequest(message);
    }

    const provinceName = await this.provinceRepository.getProvinceByName(
      schema.name,
      schema.id_country,
    );
    if (provinceName) {
      throw CustomError.conflict(
        'Ya existe una provincia con el nombre ingresado',
      );
    }

    const createdProvince =
      await this.provinceRepository.createProvince(schema);
    if (!createdProvince) {
      throw CustomError.internalServer('No se pudo crear la provincia');
    }

    return createdProvince;
  }
}
