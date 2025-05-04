import {
  CreatePhoneTypeDto,
  DeletePhoneTypeDto,
  GetAllPhoneTypesDto,
  GetPhoneTypeDto,
  UpdatePhoneTypeDto,
} from '../../domain/dtos/phone_type';
import { PhoneType } from '../../domain/entities';
import { PhoneTypeRepository } from '../../ports/repositories';
import { PhoneTypeDataSource } from '../../ports/data_sources';

export class PhoneTypeRepositoryImpl implements PhoneTypeRepository {
  private readonly phoneTypeDataSource: PhoneTypeDataSource;

  constructor(phoneTypeDataSource: PhoneTypeDataSource) {
    this.phoneTypeDataSource = phoneTypeDataSource;
  }

  create(createPhoneTypeDto: CreatePhoneTypeDto): Promise<PhoneType> {
    return this.phoneTypeDataSource.create(createPhoneTypeDto);
  }

  update(updatePhoneTypeDto: UpdatePhoneTypeDto): Promise<PhoneType> {
    return this.phoneTypeDataSource.update(updatePhoneTypeDto);
  }

  get(getPhoneTypeDto: GetPhoneTypeDto): Promise<PhoneType> {
    return this.phoneTypeDataSource.get(getPhoneTypeDto);
  }

  getAll(getAllPhoneTypesDto: GetAllPhoneTypesDto): Promise<PhoneType[]> {
    return this.phoneTypeDataSource.getAll(getAllPhoneTypesDto);
  }

  delete(deletePhoneTypeDto: DeletePhoneTypeDto): Promise<PhoneType> {
    return this.phoneTypeDataSource.delete(deletePhoneTypeDto);
  }
}
