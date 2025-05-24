import { Province } from '../../entities';
import { CustomError } from '../../errors';
import { ProvinceRepository } from '../../../ports/repositories';
import { ProvinceIdPortDto, ProvinceIdSchema } from '../../schemas/province';

export class GetProvinceUseCase {
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

    const province = await this.provinceRepository.getProvinceById(
      parseInt(schema.id, 10),
    );
    if (!province) {
      throw CustomError.notFound('No se ha encontrado la provincia solicitada');
    }

    return province;
  }
}
