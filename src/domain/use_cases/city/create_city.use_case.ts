import { City } from '../../entities';
import { CreateCityDto } from '../../dtos/city';
import { CityRepository } from '../../repositories';

interface CreateCityUseCase {
  execute(createCityDto: CreateCityDto): Promise<City>;
}

export class CreateCity implements CreateCityUseCase {
  private readonly cityRepository: CityRepository;

  constructor(cityRepository: CityRepository) {
    this.cityRepository = cityRepository;
  }

  async execute(createCityDto: CreateCityDto): Promise<City> {
    return this.cityRepository.create(createCityDto);
  }
}
