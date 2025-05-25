import { IdentificationType } from '../../domain/entities';
import {
  CreateIdentTypeDto,
  GetAllIdentTypesDto,
  UpdateIdentTypeDto,
} from '../../domain/schemas/identification_type';

export abstract class IdentificationTypeRepository {
  abstract getIdentTypeByName(name: string): Promise<IdentificationType | null>;

  abstract createIdentType(
    createIdentTypeDto: CreateIdentTypeDto,
  ): Promise<IdentificationType | null>;

  abstract getIdentTypeById(id: number): Promise<IdentificationType | null>;

  abstract getIdentTypeByNameIdAndCountry(
    id: number,
    name: string,
    id_country: number,
  ): Promise<IdentificationType | null>;

  abstract getIdentTypeByNameAndCountry(
    name: string,
    id_country: number,
  ): Promise<IdentificationType | null>;

  abstract updateIdentType(
    updateIdentTypeDto: UpdateIdentTypeDto,
  ): Promise<IdentificationType | null>;

  abstract getAllIdentTypes(
    getAllIdentTypesDto: GetAllIdentTypesDto,
  ): Promise<IdentificationType[]>;

  abstract deleteIdentType(id: number): Promise<IdentificationType | null>;
}
