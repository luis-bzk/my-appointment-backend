import { Request, Response } from 'express';

import {
  CreateCityUseCase,
  DeleteCityUseCase,
  GetAllCitiesUseCase,
  GetCityUseCase,
  UpdateCityUseCase,
} from '../../domain/use_cases/city';
import { BaseController } from '../BaseController';
import {
  CityRepository,
  CountryRepository,
  ProvinceRepository,
} from '../../ports/repositories';
import { GetCountryUseCase } from '../../domain/use_cases/country';
import { GetProvinceCountryUseCase } from '../../domain/use_cases/province';

export class CityController extends BaseController {
  private readonly cityRepository: CityRepository;
  private readonly provinceRepository: ProvinceRepository;
  private readonly countryRepository: CountryRepository;

  constructor(
    cityRepository: CityRepository,
    provinceRepository: ProvinceRepository,
    countryRepository: CountryRepository,
  ) {
    super();
    this.cityRepository = cityRepository;
    this.provinceRepository = provinceRepository;
    this.countryRepository = countryRepository;
  }

  createCity = async (req: Request, res: Response) => {
    try {
      await new GetCountryUseCase(this.countryRepository).execute({
        id: req.body.id_country ? req.body.id_country.toString() : undefined,
      });
      await new GetProvinceCountryUseCase(this.provinceRepository).execute({
        id_province: req.body.id_province,
        id_country: req.body.id_country,
      });

      const data = await new CreateCityUseCase(this.cityRepository).execute(
        req.body,
      );

      return res.status(201).json(data);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  updateCity = async (req: Request, res: Response) => {
    try {
      await new GetCountryUseCase(this.countryRepository).execute({
        id: req.body.id_country ? req.body.id_country.toString() : undefined,
      });

      await new GetProvinceCountryUseCase(this.provinceRepository).execute({
        id_province: req.body.id_province,
        id_country: req.body.id_country,
      });

      const data = await new UpdateCityUseCase(this.cityRepository).execute({
        ...req.params,
        ...req.body,
      });

      return res.status(200).json(data);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  getCity = async (req: Request, res: Response) => {
    try {
      const data = await new GetCityUseCase(this.cityRepository).execute({
        id: req.params.id,
      });

      return res.status(200).json(data);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  getAllCities = async (req: Request, res: Response) => {
    try {
      const data = await new GetAllCitiesUseCase(this.cityRepository).execute({
        ...req.query,
      });

      return res.status(200).json(data);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  deleteCity = async (req: Request, res: Response) => {
    try {
      const data = await new DeleteCityUseCase(this.cityRepository).execute({
        id: req.params.id,
      });

      return res.status(200).json(data);
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
