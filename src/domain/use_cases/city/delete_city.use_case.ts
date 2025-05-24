import { City } from '../../entities';
import { CustomError } from '../../errors';
import { RECORD_STATUS } from '../../../shared';
import { CityRepository } from '../../../ports/repositories';
import { CityIdPortDto, CityIdSchema } from '../../schemas/city';

export class DeleteCityUseCase {
  private readonly cityRepository: CityRepository;

  constructor(cityRepository: CityRepository) {
    this.cityRepository = cityRepository;
  }

  async execute(dto: CityIdPortDto): Promise<City> {
    const { success, error, data: schema } = CityIdSchema.safeParse(dto);
    if (!success) {
      const message = error.errors[0]?.message || 'Datos inválidos';
      throw CustomError.badRequest(message);
    }
    const cityId = parseInt(schema.id, 10);

    const cityExists = await this.cityRepository.getCityById(cityId);
    if (!cityExists || cityExists.record_status === RECORD_STATUS.UNAVAILABLE) {
      throw CustomError.notFound('No se ha encontrado la ciudad a eliminar');
    }

    const deletedCity = await this.cityRepository.deleteCity(cityId);
    if (!deletedCity) {
      throw CustomError.internalServer('No se pudo eliminar la ciudad');
    }

    return deletedCity;
  }
}
