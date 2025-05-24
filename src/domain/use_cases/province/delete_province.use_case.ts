import { Province } from '../../entities';
import {
  ProvinceIdDto,
  ProvinceIdPortDto,
  ProvinceIdSchema,
} from '../../schemas/province';
import { CustomError } from '../../errors';
import { ProvinceRepository } from '../../../ports/repositories';

export class DeleteProvinceUseCase {
  private readonly provinceRepository: ProvinceRepository;

  constructor(provinceRepository: ProvinceRepository) {
    this.provinceRepository = provinceRepository;
  }

  async execute(dto: ProvinceIdPortDto): Promise<Province> {
    const { success, error, data: schema } = ProvinceIdSchema.safeParse(dto);
    if (!success) {
      const message = error.errors[0]?.message || 'Datos inválidos';
      throw CustomError.badRequest(message);
    }

    const parsedSchema: ProvinceIdDto = {
      ...schema,
      id: parseInt(schema.id, 10),
    };

    const province = await this.provinceRepository.getProvinceById(
      parsedSchema.id,
    );
    if (!province) {
      throw CustomError.notFound('No se ha encontrado la provincia solicitada');
    }

    const deletedProvince = await this.provinceRepository.deleteProvince(
      parsedSchema.id,
    );
    if (!deletedProvince) {
      throw CustomError.internalServer('No se pudo eliminar la provincia');
    }
    return deletedProvince;
  }
}
