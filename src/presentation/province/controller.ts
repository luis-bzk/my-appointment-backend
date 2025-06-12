import { Request, Response } from 'express';

import {
  CreateProvinceUseCase,
  DeleteProvinceUseCase,
  GetAllProvincesUseCase,
  GetProvinceUseCase,
  UpdateProvinceUseCase,
} from '../../domain/use_cases/province';
import { BaseController } from '../BaseController';
import {
  CountryRepository,
  ProvinceRepository,
} from '../../ports/repositories';
import { GetCountryUseCase } from '../../domain/use_cases/country';

export class ProvinceController extends BaseController {
  private readonly provinceRepository: ProvinceRepository;
  private readonly countryRepository: CountryRepository;

  constructor(
    provinceRepository: ProvinceRepository,
    countryRepository: CountryRepository,
  ) {
    super();
    this.provinceRepository = provinceRepository;
    this.countryRepository = countryRepository;
  }

  createProvince = async (req: Request, res: Response) => {
    try {
      await new GetCountryUseCase(this.countryRepository).execute({
        id: req.body.id_country.toString(),
      });

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
      await new GetCountryUseCase(this.countryRepository).execute({
        id: req.body.id_country.toString(),
      });

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
      const data = await new GetProvinceUseCase(
        this.provinceRepository,
      ).execute({
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
