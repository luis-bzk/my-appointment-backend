import { Request, Response } from 'express';
import { PhoneTypeRepository } from '../../adapters/repositories';
import { CustomError } from '../../domain/errors';
import {
  CreatePhoneTypeDto,
  DeletePhoneTypeDto,
  GetAllPhoneTypesDto,
  GetPhoneTypeDto,
  UpdatePhoneTypeDto,
} from '../../domain/dtos/phone_type';
import {
  CreatePhoneType,
  DeletePhoneType,
  GetAllPhoneTypes,
  GetPhoneType,
  UpdatePhoneType,
} from '../../domain/use_cases/phone_type';

export class PhoneTypeController {
  private readonly phoneTypeRepository: PhoneTypeRepository;

  constructor(phoneTypeRepository: PhoneTypeRepository) {
    this.phoneTypeRepository = phoneTypeRepository;
  }

  private handleError(error: any, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }

  createPhoneType = (req: Request, res: Response) => {
    const [error, createPhoneTypeDto] = CreatePhoneTypeDto.create(req.body);
    if (error) return res.status(400).json({ message: error });

    new CreatePhoneType(this.phoneTypeRepository)
      .execute(createPhoneTypeDto!)
      .then((data) => res.status(201).json(data))
      .catch((error) => this.handleError(error, res));
  };

  updatePhoneType = (req: Request, res: Response) => {
    const [error, updatePhoneTypeDto] = UpdatePhoneTypeDto.create(
      req.params,
      req.body,
    );
    if (error) return res.status(400).json({ message: error });

    new UpdatePhoneType(this.phoneTypeRepository)
      .execute(updatePhoneTypeDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  getPhoneType = (req: Request, res: Response) => {
    const [error, getPhoneTypeDto] = GetPhoneTypeDto.create(req.params);
    if (error) return res.status(400).json({ message: error });

    new GetPhoneType(this.phoneTypeRepository)
      .execute(getPhoneTypeDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  getAllPhoneTypes = (req: Request, res: Response) => {
    const [error, getAllPhoneTypeDtos] = GetAllPhoneTypesDto.create(req.query);
    if (error) return res.status(400).json({ message: error });

    new GetAllPhoneTypes(this.phoneTypeRepository)
      .execute(getAllPhoneTypeDtos!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  deletePhoneType = (req: Request, res: Response) => {
    const [error, deletePhoneTypeDto] = DeletePhoneTypeDto.create(req.params);
    if (error) return res.status(400).json({ message: error });

    new DeletePhoneType(this.phoneTypeRepository)
      .execute(deletePhoneTypeDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };
}
