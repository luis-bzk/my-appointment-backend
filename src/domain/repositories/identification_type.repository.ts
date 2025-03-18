import {
  CreateIdentTypeDto,
  DeleteIdentTypeDto,
  GetAllIdentTypesDto,
  GetIdentTypeDto,
  UpdateIdentTypeDto,
} from '../dtos/identification_type';
import { IdentificationType, IdentificationTypeDetail } from '../entities';

export abstract class IdentificationTypeRepository {
  abstract create(
    createIdentTypeDto: CreateIdentTypeDto,
  ): Promise<IdentificationType>;

  abstract update(
    updateIdentTypeDto: UpdateIdentTypeDto,
  ): Promise<IdentificationType>;

  abstract get(getIdentTypeDto: GetIdentTypeDto): Promise<IdentificationType>;

  abstract getAll(
    getAllIdentTypesDto: GetAllIdentTypesDto,
  ): Promise<IdentificationType[]>;

  abstract getAllDetail(
    getAllIdentTypesDetailDto: GetAllIdentTypesDto,
  ): Promise<IdentificationTypeDetail[]>;

  abstract delete(
    deleteIdentTypeDto: DeleteIdentTypeDto,
  ): Promise<IdentificationType>;
}
