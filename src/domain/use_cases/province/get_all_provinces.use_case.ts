import { Province } from '../../entities';
import { ProvinceRepository } from '../../repositories';
import { GetAllProvincesDto } from '../../dtos/province';

interface GetAllProvincesUseCase {
  execute(getAllProvincesDto: GetAllProvincesDto): Promise<Province[]>;
}

export class GetAllProvinces implements GetAllProvincesUseCase {
  private readonly provinceRepository: ProvinceRepository;

  constructor(provinceRepository: ProvinceRepository) {
    this.provinceRepository = provinceRepository;
  }

  async execute(getAllProvincesDto: GetAllProvincesDto): Promise<Province[]> {
    return await this.provinceRepository.getAll(getAllProvincesDto);
  }
}
