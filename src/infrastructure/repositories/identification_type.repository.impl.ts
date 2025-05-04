import {
  CreateIdentTypeDto,
  DeleteIdentTypeDto,
  GetAllIdentTypesDto,
  GetIdentTypeDto,
  UpdateIdentTypeDto,
} from '../../domain/dtos/identification_type';
import {
  IdentificationType,
  IdentificationTypeDetail,
} from '../../domain/entities';
import { IdentificationTypeRepository } from '../../ports/repositories';
import { IdentificationTypeDataSource } from '../../ports/data_sources';

export class IdentificationTypeRepositoryImpl
  implements IdentificationTypeRepository
{
  private readonly identificationTypeDataSource: IdentificationTypeDataSource;

  constructor(identificationTypeDataSource: IdentificationTypeDataSource) {
    this.identificationTypeDataSource = identificationTypeDataSource;
  }

  create(createIdentTypeDto: CreateIdentTypeDto): Promise<IdentificationType> {
    return this.identificationTypeDataSource.create(createIdentTypeDto);
  }

  update(updateIdentTypeDto: UpdateIdentTypeDto): Promise<IdentificationType> {
    return this.identificationTypeDataSource.update(updateIdentTypeDto);
  }

  get(getIdentTypeDto: GetIdentTypeDto): Promise<IdentificationType> {
    return this.identificationTypeDataSource.get(getIdentTypeDto);
  }

  getAll(
    getAllIdentTypesDto: GetAllIdentTypesDto,
  ): Promise<IdentificationType[]> {
    return this.identificationTypeDataSource.getAll(getAllIdentTypesDto);
  }

  getAllDetail(
    getAllIdentTypesDetailDto: GetAllIdentTypesDto,
  ): Promise<IdentificationTypeDetail[]> {
    return this.identificationTypeDataSource.getAllDetail(
      getAllIdentTypesDetailDto,
    );
  }

  delete(deleteIdentTypeDto: DeleteIdentTypeDto): Promise<IdentificationType> {
    return this.identificationTypeDataSource.delete(deleteIdentTypeDto);
  }
}
