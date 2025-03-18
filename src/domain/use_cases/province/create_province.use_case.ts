import { Province } from '../../entities';
import { CreateProvinceDto } from '../../dtos/province';
import { ProvinceRepository } from '../../repositories';

interface CreateProvinceUseCase {
  execute(createProvinceDto: CreateProvinceDto): Promise<Province>;
}

export class CreateProvince implements CreateProvinceUseCase {
  private readonly provinceRepository: ProvinceRepository;

  constructor(provinceRepository: ProvinceRepository) {
    this.provinceRepository = provinceRepository;
  }

  async execute(createProvinceDto: CreateProvinceDto): Promise<Province> {
    return await this.provinceRepository.create(createProvinceDto);
  }
}
