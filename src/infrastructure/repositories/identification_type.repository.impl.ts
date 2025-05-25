import {
  CreateIdentTypeDto,
  GetAllIdentTypesDto,
  UpdateIdentTypeDto,
} from '../../domain/schemas/identification_type';
import { IdentificationTypeMapper } from '../mappers';
import { IdentificationType } from '../../domain/entities';
import { IdentificationTypeRepository } from '../../ports/repositories';
import { IdentificationTypeDataSource } from '../../ports/data_sources';

export class IdentificationTypeRepositoryImpl
  implements IdentificationTypeRepository
{
  private readonly identTypeDataSource: IdentificationTypeDataSource;

  constructor(identTypeDataSource: IdentificationTypeDataSource) {
    this.identTypeDataSource = identTypeDataSource;
  }

  async getIdentTypeByName(name: string): Promise<IdentificationType | null> {
    const identType = await this.identTypeDataSource.getIdentTypeByName(name);
    return IdentificationTypeMapper.entityFromObject(identType);
  }

  async createIdentType(
    createIdentTypeDto: CreateIdentTypeDto,
  ): Promise<IdentificationType | null> {
    const identType =
      await this.identTypeDataSource.createIdentType(createIdentTypeDto);
    return IdentificationTypeMapper.entityFromObject(identType);
  }

  async getIdentTypeById(id: number): Promise<IdentificationType | null> {
    const identType = await this.identTypeDataSource.getIdentTypeById(id);
    return IdentificationTypeMapper.entityFromObject(identType);
  }

  async getIdentTypeByNameIdAndCountry(
    id: number,
    name: string,
    id_country: number,
  ): Promise<IdentificationType | null> {
    const identType =
      await this.identTypeDataSource.getIdentTypeByNameIdAndCountry(
        id,
        name,
        id_country,
      );
    return IdentificationTypeMapper.entityFromObject(identType);
  }

  async getIdentTypeByNameAndCountry(
    name: string,
    id_country: number,
  ): Promise<IdentificationType | null> {
    const identType =
      await this.identTypeDataSource.getIdentTypeByNameAndCountry(
        name,
        id_country,
      );
    return IdentificationTypeMapper.entityFromObject(identType);
  }

  async updateIdentType(
    updateIdentTypeDto: UpdateIdentTypeDto,
  ): Promise<IdentificationType | null> {
    const identType =
      await this.identTypeDataSource.updateIdentType(updateIdentTypeDto);
    return IdentificationTypeMapper.entityFromObject(identType);
  }

  async getAllIdentTypes(
    getAllIdentTypesDto: GetAllIdentTypesDto,
  ): Promise<IdentificationType[]> {
    const identTypes =
      await this.identTypeDataSource.getAllIdentTypes(getAllIdentTypesDto);
    return IdentificationTypeMapper.entitiesFromArray(identTypes);
  }

  async deleteIdentType(id: number): Promise<IdentificationType | null> {
    const identType = await this.identTypeDataSource.deleteIdentType(id);
    return IdentificationTypeMapper.entityFromObject(identType);
  }
}
