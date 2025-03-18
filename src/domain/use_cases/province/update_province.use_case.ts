import { Province } from '../../entities';
import { UpdateProvinceDto } from '../../dtos/province';
import { ProvinceRepository } from '../../repositories';

interface UpdateProvinceUseCase {
  execute(updateProvinceDto: UpdateProvinceDto): Promise<Province>;
}

export class UpdateProvince implements UpdateProvinceUseCase {
  private readonly provinceRepository: ProvinceRepository;

  constructor(provinceRepository: ProvinceRepository) {
    this.provinceRepository = provinceRepository;
  }

  async execute(updateProvinceDto: UpdateProvinceDto): Promise<Province> {
    return await this.provinceRepository.update(updateProvinceDto);
  }
}
