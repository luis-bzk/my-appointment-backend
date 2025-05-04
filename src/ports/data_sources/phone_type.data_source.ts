import {
  CreatePhoneTypeDto,
  DeletePhoneTypeDto,
  GetAllPhoneTypesDto,
  GetPhoneTypeDto,
  UpdatePhoneTypeDto,
} from '../../domain/dtos/phone_type';
import { PhoneType } from '../../domain/entities';

export abstract class PhoneTypeDataSource {
  abstract create(createPhoneTypeDto: CreatePhoneTypeDto): Promise<PhoneType>;

  abstract update(updatePhoneTypeDto: UpdatePhoneTypeDto): Promise<PhoneType>;

  abstract get(getPhoneTypeDto: GetPhoneTypeDto): Promise<PhoneType>;

  abstract getAll(
    getAllPhoneTypesDto: GetAllPhoneTypesDto,
  ): Promise<PhoneType[]>;

  abstract delete(deletePhoneTypeDto: DeletePhoneTypeDto): Promise<PhoneType>;
}
