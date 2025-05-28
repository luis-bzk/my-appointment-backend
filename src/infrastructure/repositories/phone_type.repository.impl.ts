import { PhoneType } from '../../domain/entities';
import { PhoneTypeRepository } from '../../ports/repositories';
import { PhoneTypeDataSource } from '../../ports/data_sources';
import {
  CreatePhoneTypeDto,
  UpdatePhoneTypeDto,
} from '../../domain/schemas/phone_type';
import { PhoneTypeMapper } from '../mappers';
import { GetAllFiltersDto } from '../../domain/schemas/general';

export class PhoneTypeRepositoryImpl implements PhoneTypeRepository {
  private readonly phoneTypeDataSource: PhoneTypeDataSource;

  constructor(phoneTypeDataSource: PhoneTypeDataSource) {
    this.phoneTypeDataSource = phoneTypeDataSource;
  }

  async getPhoneTypeByName(name: string): Promise<PhoneType | null> {
    const phoneType = await this.phoneTypeDataSource.getPhoneTypeByName(name);
    return PhoneTypeMapper.entityFromObject(phoneType);
  }

  async createPhoneType(
    createPhoneTypeDto: CreatePhoneTypeDto,
  ): Promise<PhoneType | null> {
    const phoneType =
      await this.phoneTypeDataSource.createPhoneType(createPhoneTypeDto);
    return PhoneTypeMapper.entityFromObject(phoneType);
  }

  async getPhoneTypeById(id: number): Promise<PhoneType | null> {
    const phoneType = await this.phoneTypeDataSource.getPhoneTypeById(id);
    return PhoneTypeMapper.entityFromObject(phoneType);
  }

  async getPhoneTypeByNameId(
    id: number,
    name: string,
  ): Promise<PhoneType | null> {
    const phoneType = await this.phoneTypeDataSource.getPhoneTypeByNameId(
      id,
      name,
    );
    return PhoneTypeMapper.entityFromObject(phoneType);
  }

  async updatePhoneType(
    updatePhoneTypeDto: UpdatePhoneTypeDto,
  ): Promise<PhoneType | null> {
    const phoneType =
      await this.phoneTypeDataSource.updatePhoneType(updatePhoneTypeDto);
    return PhoneTypeMapper.entityFromObject(phoneType);
  }

  async getAllPhoneTypes(dto: GetAllFiltersDto): Promise<PhoneType[]> {
    const phoneTypes = await this.phoneTypeDataSource.getAllPhoneTypes(dto);
    return PhoneTypeMapper.entitiesFromArray(phoneTypes);
  }

  async deletePhoneType(id: number): Promise<PhoneType | null> {
    const phoneType = await this.phoneTypeDataSource.deletePhoneType(id);
    return PhoneTypeMapper.entityFromObject(phoneType);
  }
}
