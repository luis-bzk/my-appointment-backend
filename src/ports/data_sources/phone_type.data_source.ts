import { PhoneTypeDB } from '../../data/interfaces';
import { GetAllFiltersDto } from '../../domain/schemas/general';
import {
  CreatePhoneTypeDto,
  UpdatePhoneTypeDto,
} from '../../domain/schemas/phone_type';

export abstract class PhoneTypeDataSource {
  abstract getPhoneTypeByName(name: string): Promise<PhoneTypeDB | null>;

  abstract createPhoneType(
    createPhoneTypeDto: CreatePhoneTypeDto,
  ): Promise<PhoneTypeDB | null>;

  abstract getPhoneTypeById(id: number): Promise<PhoneTypeDB | null>;

  abstract getPhoneTypeByNameId(
    id: number,
    name: string,
  ): Promise<PhoneTypeDB | null>;

  abstract updatePhoneType(
    updatePhoneTypeDto: UpdatePhoneTypeDto,
  ): Promise<PhoneTypeDB | null>;

  abstract getAllPhoneTypes(dto: GetAllFiltersDto): Promise<PhoneTypeDB[]>;

  abstract deletePhoneType(id: number): Promise<PhoneTypeDB | null>;
}
