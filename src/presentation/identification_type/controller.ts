import { Request, Response } from 'express';

import {
  CountryRepository,
  IdentificationTypeRepository,
} from '../../ports/repositories';
import { BaseController } from '../BaseController';
import { GetCountryUseCase } from '../../domain/use_cases/country';
import {
  CreateIdentificationTypeUseCase,
  DeleteIdentificationTypeUseCase,
  GetAllIdentificationTypesUseCase,
  GetIdentificationTypeUseCase,
  UpdateIdentificationTypeUseCase,
} from '../../domain/use_cases/identification_type';

export class IdentificationTypeController extends BaseController {
  private readonly identTypeRepository: IdentificationTypeRepository;
  private readonly countryRepository: CountryRepository;

  constructor(
    identTypeRepository: IdentificationTypeRepository,
    countryRepository: CountryRepository,
  ) {
    super();
    this.identTypeRepository = identTypeRepository;
    this.countryRepository = countryRepository;
  }

  createIdentType = async (req: Request, res: Response) => {
    try {
      await new GetCountryUseCase(this.countryRepository).execute({
        id: req.body.id_country ? req.body.id_country.toString() : '',
      });

      const data = await new CreateIdentificationTypeUseCase(
        this.identTypeRepository,
      ).execute(req.body);

      return res.status(201).json(data);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  updateIdentType = async (req: Request, res: Response) => {
    try {
      await new GetCountryUseCase(this.countryRepository).execute({
        id: req.body.id_country ? req.body.id_country.toString() : '',
      });

      const data = await new UpdateIdentificationTypeUseCase(
        this.identTypeRepository,
      ).execute({ ...req.params, ...req.body });

      return res.status(200).json(data);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  getIdentType = async (req: Request, res: Response) => {
    try {
      const data = await new GetIdentificationTypeUseCase(
        this.identTypeRepository,
      ).execute({
        id: req.params.id,
      });
      return res.status(200).json(data);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  getAllIdentTypes = async (req: Request, res: Response) => {
    try {
      const data = await new GetAllIdentificationTypesUseCase(
        this.identTypeRepository,
      ).execute({ ...req.query });
      return res.status(200).json(data);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  deleteIdentType = async (req: Request, res: Response) => {
    try {
      const data = await new DeleteIdentificationTypeUseCase(
        this.identTypeRepository,
      ).execute({
        id: req.params.id,
      });
      return res.status(200).json(data);
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
