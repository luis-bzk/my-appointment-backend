import { City } from '../../entities';
import { GetAllCitiesDto } from '../../dtos/city';
import { CityRepository } from '../../repositories';

interface GetAllCitiesUseCase {
  execute(getAllCitiesDto: GetAllCitiesDto): Promise<City[]>;
}

export class GetAllCities implements GetAllCitiesUseCase {
  private readonly cityRepository: CityRepository;

  constructor(cityRepository: CityRepository) {
    this.cityRepository = cityRepository;
  }

  execute(getAllCitiesDto: GetAllCitiesDto): Promise<City[]> {
    return this.cityRepository.getAll(getAllCitiesDto);
  }
}
