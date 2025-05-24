import { Request, Response } from 'express';

import {
  CreateCountryUseCase,
  DeleteCountryUseCase,
  GetAllCountriesUseCase,
  GetCountryUseCase,
  UpdateCountryUseCase,
} from '../../domain/use_cases/country';
import { BaseController } from '../BaseController';
import { CountryRepository } from '../../ports/repositories';

export class CountryController extends BaseController {
  private readonly countryRepository: CountryRepository;

  constructor(countryRepository: CountryRepository) {
    super();
    this.countryRepository = countryRepository;
  }

  createCountry = async (req: Request, res: Response) => {
    try {
      const data = await new CreateCountryUseCase(
        this.countryRepository,
      ).execute(req.body);

      return res.status(201).json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  };

  updateCountry = async (req: Request, res: Response) => {
    try {
      const data = await new UpdateCountryUseCase(
        this.countryRepository,
      ).execute({
        ...req.params,
        ...req.body,
      });

      return res.status(200).json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  };

  getCountry = async (req: Request, res: Response) => {
    try {
      const data = await new GetCountryUseCase(this.countryRepository).execute({
        id: req.params.id,
      });

      return res.status(200).json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  };

  getAllCountries = async (req: Request, res: Response) => {
    try {
      const data = await new GetAllCountriesUseCase(
        this.countryRepository,
      ).execute(req.query);

      return res.status(200).json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  };

  deleteCountry = async (req: Request, res: Response) => {
    try {
      const data = await new DeleteCountryUseCase(
        this.countryRepository,
      ).execute({ id: req.params.id });

      return res.status(200).json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  };
}
