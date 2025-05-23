import { City } from '../../entities';
import { DeleteCityDto } from '../../dtos/city';
import { CityRepository } from '../../../ports/repositories';

interface DeleteCityUseCase {
  execute(deleteCityDto: DeleteCityDto): Promise<City>;
}

export class DeleteCity implements DeleteCityUseCase {
  private readonly cityRepository: CityRepository;

  constructor(cityRepository: CityRepository) {
    this.cityRepository = cityRepository;
  }

  execute(deleteCityDto: DeleteCityDto): Promise<City> {
    return this.cityRepository.delete(deleteCityDto);
  }
}
