import { Province } from '../../entities';
import { DeleteProvinceDto } from '../../dtos/province';
import { ProvinceRepository } from '../../repositories';

interface DeleteProvinceUseCase {
  execute(deleteProvinceDto: DeleteProvinceDto): Promise<Province>;
}

export class DeleteProvince implements DeleteProvinceUseCase {
  private readonly provinceRepository: ProvinceRepository;

  constructor(provinceRepository: ProvinceRepository) {
    this.provinceRepository = provinceRepository;
  }

  async execute(deleteProvinceDto: DeleteProvinceDto): Promise<Province> {
    return this.provinceRepository.delete(deleteProvinceDto);
  }
}
