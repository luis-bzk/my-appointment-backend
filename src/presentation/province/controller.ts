import { Request, Response } from 'express';

import {
  CreateProvinceUseCase,
  DeleteProvinceUseCase,
  GetAllProvincesUseCase,
  GetProvinceUseCase,
  UpdateProvinceUseCase,
} from '../../domain/use_cases/province';
import { BaseController } from '../BaseController';
import { ProvinceRepository } from '../../ports/repositories';

export class ProvinceController extends BaseController {
  private readonly provinceRepository: ProvinceRepository;

  constructor(provinceRepository: ProvinceRepository) {
    super();
    this.provinceRepository = provinceRepository;
  }

  createProvince = async (req: Request, res: Response) => {
    try {
      const data = await new CreateProvinceUseCase(
        this.provinceRepository,
      ).execute(req.body);

      return res.status(201).json(data);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  updateProvince = async (req: Request, res: Response) => {
    try {
      const data = await new UpdateProvinceUseCase(
        this.provinceRepository,
      ).execute({ ...req.params, ...req.body });

      return res.status(200).json(data);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  getProvince = async (req: Request, res: Response) => {
    try {
      const data = new GetProvinceUseCase(this.provinceRepository).execute({
        id: req.params.id,
      });

      return res.status(200).json(data);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  getAllProvinces = async (req: Request, res: Response) => {
    try {
      const data = await new GetAllProvincesUseCase(
        this.provinceRepository,
      ).execute(req.query);

      return res.status(200).json(data);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  deleteProvince = async (req: Request, res: Response) => {
    try {
      const data = await new DeleteProvinceUseCase(
        this.provinceRepository,
      ).execute({
        id: req.params.id,
      });

      return res.status(200).json(data);
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
