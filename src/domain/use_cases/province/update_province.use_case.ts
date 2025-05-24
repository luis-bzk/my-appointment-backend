import { Province } from '../../entities';
import {
  UpdateProvinceDto,
  UpdateProvinceSchema,
} from '../../schemas/province';
import { CustomError } from '../../errors';
import { RECORD_STATUS } from '../../../shared';
import { ProvinceRepository } from '../../../ports/repositories';

export class UpdateProvinceUseCase {
  private readonly provinceRepository: ProvinceRepository;

  constructor(provinceRepository: ProvinceRepository) {
    this.provinceRepository = provinceRepository;
  }

  async execute(updateProvinceDto: UpdateProvinceDto): Promise<Province> {
    const {
      success,
      error,
      data: schema,
    } = UpdateProvinceSchema.safeParse(updateProvinceDto);
    if (!success) {
      const message = error.errors[0]?.message || 'Datos inválidos';
      throw CustomError.badRequest(message);
    }

    const schemaParsed: UpdateProvinceDto = {
      ...schema,
      id: parseInt(schema.id, 10),
    };

    const provinceId = await this.provinceRepository.getProvinceById(
      schemaParsed.id,
    );
    if (!provinceId || provinceId.record_status === RECORD_STATUS.UNAVAILABLE) {
      throw CustomError.notFound(
        'No se ha encontrado la provincia a actualizar',
      );
    }

    const provinceNameId = await this.provinceRepository.getProvinceByIdName(
      schemaParsed.id,
      schemaParsed.name,
      schemaParsed.id_country,
    );
    if (provinceNameId) {
      throw CustomError.conflict(
        'Ya existe una provincia con el nombre ingresado en el país seleccionado',
      );
    }

    const updatedProvince =
      await this.provinceRepository.updateProvince(schemaParsed);
    if (!updatedProvince) {
      throw CustomError.internalServer('No se pudo actualizar la provincia');
    }

    return updatedProvince;
  }
}
