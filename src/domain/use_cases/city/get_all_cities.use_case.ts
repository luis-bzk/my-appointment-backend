import { City } from '../../entities';
import {
  GetAllCitiesDto,
  GetAllCitiesPortDto,
  GetAllCitiesSchema,
} from '../../schemas/city';
import { CustomError } from '../../errors';
import { CityRepository } from '../../../ports/repositories';

export class GetAllCitiesUseCase {
  private readonly cityRepository: CityRepository;

  constructor(cityRepository: CityRepository) {
    this.cityRepository = cityRepository;
  }

  async execute(getAllCitiesDto: GetAllCitiesPortDto): Promise<City[]> {
    const {
      success,
      error,
      data: schema,
    } = GetAllCitiesSchema.safeParse(getAllCitiesDto);
    if (!success) {
      const message = error.errors[0]?.message || 'Datos inválidos';
      throw CustomError.badRequest(message);
    }

    const parsedSchema: GetAllCitiesDto = {
      ...schema,
      limit: schema.limit ? parseInt(schema.limit, 10) : undefined,
      offset: schema.offset ? parseInt(schema.offset, 10) : undefined,
      id_country: schema.id_country
        ? parseInt(schema.id_country, 10)
        : undefined,
      id_province: schema.id_province
        ? parseInt(schema.id_province, 10)
        : undefined,
    };

    return await this.cityRepository.getAllCities(parsedSchema);
  }
}
