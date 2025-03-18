import { Province } from '../../entities';
import { GetProvinceDto } from '../../dtos/province';
import { ProvinceRepository } from '../../repositories';

interface GetProvinceUseCase {
  execute(getProvinceDto: GetProvinceDto): Promise<Province>;
}

export class GetProvince implements GetProvinceUseCase {
  private readonly provinceRepository: ProvinceRepository;

  constructor(provinceRepository: ProvinceRepository) {
    this.provinceRepository = provinceRepository;
  }

  async execute(getProvinceDto: GetProvinceDto): Promise<Province> {
    return await this.provinceRepository.get(getProvinceDto);
  }
}
