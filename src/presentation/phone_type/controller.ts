import { Request, Response } from 'express';
import { PhoneTypeRepository } from '../../ports/repositories';
import { CustomError } from '../../domain/errors';
import {
  CreatePhoneTypeUseCase,
  DeletePhoneTypeUseCase,
  GetAllPhoneTypesUseCase,
  GetPhoneTypeUseCase,
  UpdatePhoneTypeUseCase,
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

  createPhoneType = async (req: Request, res: Response) => {
    try {
      const data = await new CreatePhoneTypeUseCase(
        this.phoneTypeRepository,
      ).execute(req.body);

      return res.status(201).json(data);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  updatePhoneType = async (req: Request, res: Response) => {
    try {
      const data = await new UpdatePhoneTypeUseCase(
        this.phoneTypeRepository,
      ).execute({ ...req.params, ...req.body });

      return res.status(200).json(data);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  getPhoneType = async (req: Request, res: Response) => {
    try {
      const data = await new GetPhoneTypeUseCase(
        this.phoneTypeRepository,
      ).execute({ id: req.params.id });

      return res.status(200).json(data);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  getAllPhoneTypes = async (req: Request, res: Response) => {
    try {
      const data = await new GetAllPhoneTypesUseCase(
        this.phoneTypeRepository,
      ).execute(req.query);

      return res.status(200).json(data);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  deletePhoneType = async (req: Request, res: Response) => {
    try {
      const data = await new DeletePhoneTypeUseCase(
        this.phoneTypeRepository,
      ).execute({ id: req.params.id });

      return res.status(200).json(data);
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
