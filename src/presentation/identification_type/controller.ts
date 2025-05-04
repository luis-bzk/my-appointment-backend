import { Request, Response } from 'express';

import {
  CreateIdentTypeDto,
  DeleteIdentTypeDto,
  GetAllIdentTypesDto,
  GetIdentTypeDto,
  UpdateIdentTypeDto,
} from '../../domain/dtos/identification_type';
import { CustomError } from '../../domain/errors';
import {
  CreateIdentificationType,
  DeleteIdentificationType,
  GetAllIdentificationTypes,
  GetAllIdentificationTypesDetail,
  GetIdentificationType,
  UpdateIdentificationType,
} from '../../domain/use_cases/identification_type';
import { IdentificationTypeRepository } from '../../ports/repositories';

export class IdentificationTypeController {
  private readonly identificationTypeRepository: IdentificationTypeRepository;

  constructor(identificationTypeRepository: IdentificationTypeRepository) {
    this.identificationTypeRepository = identificationTypeRepository;
  }

  private handleError(error: unknown, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    // unknown error
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }

  createIdentType = (req: Request, res: Response) => {
    const [error, createIdentTypeDto] = CreateIdentTypeDto.create(req.body);
    if (error) return res.status(400).json({ message: error });

    new CreateIdentificationType(this.identificationTypeRepository)
      .execute(createIdentTypeDto!)
      .then((data) => res.status(201).json(data))
      .catch((error) => this.handleError(error, res));
  };

  updateIdentType = (req: Request, res: Response) => {
    const [error, updateIdentTypeDto] = UpdateIdentTypeDto.create(
      req.params,
      req.body,
    );
    if (error) return res.status(400).json({ message: error });

    new UpdateIdentificationType(this.identificationTypeRepository)
      .execute(updateIdentTypeDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  getIdentType = (req: Request, res: Response) => {
    const [error, getIdentTypeDto] = GetIdentTypeDto.create(req.params);
    if (error) return res.status(400).json({ message: error });

    new GetIdentificationType(this.identificationTypeRepository)
      .execute(getIdentTypeDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  getAllIdentTypes = (req: Request, res: Response) => {
    const [error, getAllIdentTypesDto] = GetAllIdentTypesDto.create(req.query);
    if (error) return res.status(400).json({ message: error });

    new GetAllIdentificationTypes(this.identificationTypeRepository)
      .execute(getAllIdentTypesDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  getAllIdentTypesDetail = (req: Request, res: Response) => {
    const [error, getAllIdentTypesDto] = GetAllIdentTypesDto.create(req.query);
    if (error) return res.status(400).json({ message: error });

    new GetAllIdentificationTypesDetail(this.identificationTypeRepository)
      .execute(getAllIdentTypesDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  deleteIdentType = (req: Request, res: Response) => {
    const [error, deleteIdentTypeDto] = DeleteIdentTypeDto.create(req.params);
    if (error) return res.status(400).json({ message: error });

    new DeleteIdentificationType(this.identificationTypeRepository)
      .execute(deleteIdentTypeDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };
}
