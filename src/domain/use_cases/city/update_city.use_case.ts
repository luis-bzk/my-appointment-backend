import { City } from '../../entities';
import { UpdateCityDto } from '../../dtos/city';
import { CityRepository } from '../../repositories';

interface UpdateCityUseCase {
  execute(updateCityDto: UpdateCityDto): Promise<City>;
}

export class UpdateCity implements UpdateCityUseCase {
  private readonly cityRepository: CityRepository;

  constructor(cityRepository: CityRepository) {
    this.cityRepository = cityRepository;
  }

  async execute(updateCityDto: UpdateCityDto): Promise<City> {
    return this.cityRepository.update(updateCityDto);
  }
}
