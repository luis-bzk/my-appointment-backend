import {
  CreatePhoneTypeDto,
  UpdatePhoneTypeDto,
} from '../../domain/schemas/phone_type';
import { PhoneType } from '../../domain/entities';
import { GetAllFiltersDto } from '../../domain/schemas/general';

export abstract class PhoneTypeRepository {
  abstract getPhoneTypeByName(name: string): Promise<PhoneType | null>;

  abstract createPhoneType(
    createPhoneTypeDto: CreatePhoneTypeDto,
  ): Promise<PhoneType | null>;

  abstract getPhoneTypeById(id: number): Promise<PhoneType | null>;

  abstract getPhoneTypeByNameId(
    id: number,
    name: string,
  ): Promise<PhoneType | null>;

  abstract updatePhoneType(
    updatePhoneTypeDto: UpdatePhoneTypeDto,
  ): Promise<PhoneType | null>;

  abstract getAllPhoneTypes(dto: GetAllFiltersDto): Promise<PhoneType[]>;

  abstract deletePhoneType(id: number): Promise<PhoneType | null>;
}
