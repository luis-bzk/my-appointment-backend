import { City } from '../../entities';
import { CityRepository } from '../../../ports/repositories';
import {
  UpdateCityDto,
  UpdateCityPortDto,
  UpdateCitySchema,
} from '../../schemas/city';
import { CustomError } from '../../errors';
import { RECORD_STATUS } from '../../../shared';

export class UpdateCityUseCase {
  private readonly cityRepository: CityRepository;

  constructor(cityRepository: CityRepository) {
    this.cityRepository = cityRepository;
  }

  async execute(updateCityDto: UpdateCityPortDto): Promise<City> {
    const {
      success,
      error,
      data: schema,
    } = UpdateCitySchema.safeParse(updateCityDto);
    if (!success) {
      const message = error.errors[0]?.message || 'Datos inválidos';
      throw CustomError.badRequest(message);
    }
    const parsedSchema: UpdateCityDto = {
      ...schema,
      id: Number(schema.id),
    };

    const cityExists = await this.cityRepository.getCityById(parsedSchema.id);
    if (!cityExists || cityExists.record_status === RECORD_STATUS.UNAVAILABLE) {
      throw CustomError.notFound('No se ha encontrado la ciudad a actualizar');
    }

    const cityNameExists = await this.cityRepository.getCityByNameIdAndProvince(
      parsedSchema.id,
      parsedSchema.name,
      parsedSchema.id_province,
    );
    if (cityNameExists) {
      throw CustomError.conflict(
        'Ya existe una ciudad con el nombre ingresado en la provincia seleccionada',
      );
    }

    const cityUpdated = await this.cityRepository.updateCity(parsedSchema);
    if (!cityUpdated) {
      throw CustomError.internalServer('No se pudo actualizar la ciudad');
    }

    return cityUpdated;
  }
}
