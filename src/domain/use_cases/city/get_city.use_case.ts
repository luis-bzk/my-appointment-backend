import { City } from '../../entities';
import { CityRepository } from '../../../ports/repositories';
import { CityIdPortDto, CityIdSchema } from '../../schemas/city';
import { CustomError } from '../../errors';

export class GetCityUseCase {
  private readonly cityRepository: CityRepository;

  constructor(cityRepository: CityRepository) {
    this.cityRepository = cityRepository;
  }

  async execute(getCityDto: CityIdPortDto): Promise<City> {
    const { success, error, data: schema } = CityIdSchema.safeParse(getCityDto);
    if (!success) {
      const message = error.errors[0]?.message || 'Datos inválidos';
      throw CustomError.badRequest(message);
    }

    const cityId = parseInt(schema.id, 10);

    const city = await this.cityRepository.getCityById(cityId);
    if (!city) {
      throw CustomError.notFound('No se ha encontrado la ciudad solicitada');
    }

    return city;
  }
}
