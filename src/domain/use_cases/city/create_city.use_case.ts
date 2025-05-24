import { City } from '../../entities';
import { CustomError } from '../../errors';
import { CityRepository } from '../../../ports/repositories';
import { CreateCityDto, CreateCitySchema } from '../../schemas/city';

export class CreateCityUseCase {
  private readonly cityRepository: CityRepository;

  constructor(cityRepository: CityRepository) {
    this.cityRepository = cityRepository;
  }

  async execute(createCityDto: CreateCityDto): Promise<City> {
    const {
      success,
      error,
      data: schema,
    } = CreateCitySchema.safeParse(createCityDto);
    if (!success) {
      const message = error.errors[0]?.message || 'Datos inválidos';
      throw CustomError.badRequest(message);
    }

    const cityName = await this.cityRepository.getCityByNameAndProvince(
      schema.name,
      schema.id_province,
    );
    if (cityName) {
      throw CustomError.conflict(
        'Ya existe una ciudad con el nombre ingresado en la provincia seleccionada',
      );
    }

    const createdCity = await this.cityRepository.createCity(schema);
    if (!createdCity) {
      throw CustomError.internalServer('No se pudo crear la ciudad');
    }

    return createdCity;
  }
}
