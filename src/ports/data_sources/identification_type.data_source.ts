import { IdentificationTypeDB } from '../../data/interfaces';
import {
  CreateIdentTypeDto,
  GetAllIdentTypesDto,
  UpdateIdentTypeDto,
} from '../../domain/schemas/identification_type';

export abstract class IdentificationTypeDataSource {
  abstract getIdentTypeByName(
    name: string,
  ): Promise<IdentificationTypeDB | null>;

  abstract createIdentType(
    createIdentTypeDto: CreateIdentTypeDto,
  ): Promise<IdentificationTypeDB | null>;

  abstract getIdentTypeById(id: number): Promise<IdentificationTypeDB | null>;

  abstract getIdentTypeByNameIdAndCountry(
    id: number,
    name: string,
    id_country: number,
  ): Promise<IdentificationTypeDB | null>;

  abstract getIdentTypeByNameAndCountry(
    name: string,
    id_country: number,
  ): Promise<IdentificationTypeDB | null>;

  abstract updateIdentType(
    updateIdentTypeDto: UpdateIdentTypeDto,
  ): Promise<IdentificationTypeDB | null>;

  abstract getAllIdentTypes(
    getAllIdentTypesDto: GetAllIdentTypesDto,
  ): Promise<IdentificationTypeDB[]>;

  abstract deleteIdentType(id: number): Promise<IdentificationTypeDB | null>;
}
