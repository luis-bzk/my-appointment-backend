import { Request, Response } from 'express';

import { CustomError } from '../../domain/errors';
import { CityRepository } from '../../ports/repositories';
import {
  CreateCityDto,
  DeleteCityDto,
  GetAllCitiesDto,
  GetCityDto,
  UpdateCityDto,
} from '../../domain/dtos/city';
import {
  CreateCity,
  DeleteCity,
  GetAllCities,
  GetCity,
  UpdateCity,
} from '../../domain/use_cases/city';

export class CityController {
  private readonly cityRepository: CityRepository;

  constructor(cityRepository: CityRepository) {
    this.cityRepository = cityRepository;
  }

  private handleError(error: unknown, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    // unknown error
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }

  createCity = (req: Request, res: Response) => {
    const [error, createCityDto] = CreateCityDto.create(req.body);
    if (error) return res.status(400).json({ message: error });

    new CreateCity(this.cityRepository)
      .execute(createCityDto!)
      .then((data) => res.status(201).json(data))
      .catch((error) => this.handleError(error, res));
  };

  updateCity = (req: Request, res: Response) => {
    const [error, updateCityDto] = UpdateCityDto.create(req.params, req.body);
    if (error) return res.status(400).json({ message: error });

    new UpdateCity(this.cityRepository)
      .execute(updateCityDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  getCity = (req: Request, res: Response) => {
    const [error, getCityDto] = GetCityDto.create(req.params);
    if (error) return res.status(400).json({ message: error });

    new GetCity(this.cityRepository)
      .execute(getCityDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  getAllCities = (req: Request, res: Response) => {
    const [error, getAllCitiesDto] = GetAllCitiesDto.create(req.query);
    if (error) return res.status(400).json({ message: error });

    new GetAllCities(this.cityRepository)
      .execute(getAllCitiesDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  deleteCity = (req: Request, res: Response) => {
    const [error, deleteCityDto] = DeleteCityDto.create(req.params);
    if (error) return res.status(400).json({ message: error });

    new DeleteCity(this.cityRepository)
      .execute(deleteCityDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };
}
