import { Request, Response } from 'express';

import {
  CreateCountryUseCase,
  DeleteCountryUseCase,
  GetAllCountriesUseCase,
  GetCountryUseCase,
  UpdateCountryUseCase,
} from '../../domain/use_cases/country';
import { CustomError } from '../../domain/errors';
import { CountryRepository } from '../../ports/repositories';

export class CountryController {
  private readonly countryRepository: CountryRepository;

  constructor(countryRepository: CountryRepository) {
    this.countryRepository = countryRepository;
  }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Internal Server Error' });
  };

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

      return res.status(201).json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  };

  getCountry = async (req: Request, res: Response) => {
    try {
      const data = await new GetCountryUseCase(this.countryRepository).execute({
        id: req.params.id,
      });

      return res.status(201).json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  };

  getAllCountries = async (req: Request, res: Response) => {
    try {
      const data = await new GetAllCountriesUseCase(
        this.countryRepository,
      ).execute(req.query);

      return res.status(201).json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  };

  deleteCountry = async (req: Request, res: Response) => {
    try {
      const data = await new DeleteCountryUseCase(
        this.countryRepository,
      ).execute({ id: req.params.id });

      return res.status(201).json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  };
}
