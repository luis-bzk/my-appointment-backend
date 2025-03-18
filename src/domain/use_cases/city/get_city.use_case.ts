import { City } from '../../entities';
import { GetCityDto } from '../../dtos/city';
import { CityRepository } from '../../repositories';

interface GetCityUseCase {
  execute(getCityDto: GetCityDto): Promise<City>;
}

export class GetCity implements GetCityUseCase {
  private readonly cityRepository: CityRepository;

  constructor(cityRepository: CityRepository) {
    this.cityRepository = cityRepository;
  }

  async execute(getCityDto: GetCityDto): Promise<City> {
    return this.cityRepository.get(getCityDto);
  }
}
