import { Request, Response } from 'express';

import { CustomError } from '../../domain/errors';
import {
  CreateCountryDto,
  DeleteCountryDto,
  GetAllCountriesDto,
  GetCountryDto,
  UpdateCountryDto,
} from '../../domain/dtos/country';
import { CountryRepository } from '../../ports/repositories';
import {
  CreateCountry,
  DeleteCountry,
  GetAllCountries,
  GetCountry,
  UpdateCountry,
} from '../../domain/use_cases/country';

export class CountryController {
  private readonly countryRepository: CountryRepository;

  constructor(countryRepository: CountryRepository) {
    this.countryRepository = countryRepository;
  }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    // unknown error
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  };

  createCountry = (req: Request, res: Response) => {
    const [error, createCountryDto] = CreateCountryDto.create(req.body);

    if (error) return res.status(400).json({ message: error });

    new CreateCountry(this.countryRepository)
      .execute(createCountryDto!)
      .then((data) => res.status(201).json(data))
      .catch((error) => this.handleError(error, res));
  };

  updateCountry = (req: Request, res: Response) => {
    const [error, updateCountryDto] = UpdateCountryDto.create(
      req.params,
      req.body,
    );

    if (error) return res.status(400).json({ message: error });

    new UpdateCountry(this.countryRepository)
      .execute(updateCountryDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  getCountry = (req: Request, res: Response) => {
    const [error, getCountryDto] = GetCountryDto.create(req.params);

    if (error) return res.status(400).json({ message: error });

    new GetCountry(this.countryRepository)
      .execute(getCountryDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  getAllCountries = (req: Request, res: Response) => {
    const [error, getAllCountriesDto] = GetAllCountriesDto.create(req.query);
    if (error) return res.status(400).json({ message: error });

    new GetAllCountries(this.countryRepository)
      .execute(getAllCountriesDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  deleteCountry = (req: Request, res: Response) => {
    const [error, deleteCountryDto] = DeleteCountryDto.create(req.params);
    if (error) return res.status(400).json({ message: error });

    new DeleteCountry(this.countryRepository)
      .execute(deleteCountryDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };
}
