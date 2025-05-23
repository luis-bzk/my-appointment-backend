import { Request, Response } from 'express';

import { ProvinceRepository } from '../../ports/repositories';
import { CustomError } from '../../domain/errors';
import {
  CreateProvinceDto,
  DeleteProvinceDto,
  GetAllProvincesDto,
  GetProvinceDto,
  UpdateProvinceDto,
} from '../../domain/dtos/province';
import {
  CreateProvince,
  DeleteProvince,
  GetAllProvinces,
  GetProvince,
  UpdateProvince,
} from '../../domain/use_cases/province';

export class ProvinceController {
  private readonly provinceRepository: ProvinceRepository;

  constructor(provinceRepository: ProvinceRepository) {
    this.provinceRepository = provinceRepository;
  }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    // unknown error
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  };

  createProvince = (req: Request, res: Response) => {
    const [error, createProvinceDto] = CreateProvinceDto.create(req.body);

    if (error) return res.status(400).json({ message: error });

    new CreateProvince(this.provinceRepository)
      .execute(createProvinceDto!)
      .then((data) => res.status(201).json(data))
      .catch((error) => this.handleError(error, res));
  };

  updateProvince = (req: Request, res: Response) => {
    const [error, updateProvinceDto] = UpdateProvinceDto.create(
      req.params,
      req.body,
    );
    if (error) return res.status(400).json({ message: error });

    new UpdateProvince(this.provinceRepository)
      .execute(updateProvinceDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  getProvince = (req: Request, res: Response) => {
    const [error, getProvinceDto] = GetProvinceDto.create(req.params);
    if (error) return res.status(400).json({ message: error });

    new GetProvince(this.provinceRepository)
      .execute(getProvinceDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  getAllProvinces = (req: Request, res: Response) => {
    const [error, getAllProvinceDto] = GetAllProvincesDto.create(req.query);
    if (error) return res.status(400).json({ message: error });

    new GetAllProvinces(this.provinceRepository)
      .execute(getAllProvinceDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  deleteProvince = (req: Request, res: Response) => {
    const [error, deleteProvinceDto] = DeleteProvinceDto.create(req.params);
    if (error) return res.status(400).json({ message: error });

    new DeleteProvince(this.provinceRepository)
      .execute(deleteProvinceDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };
}
