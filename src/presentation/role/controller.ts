import { Request, Response } from 'express';

import { CustomError } from '../../domain/errors';
import { RoleRepository } from '../../adapters/repositories';
import {
  CreateRoleUseCase,
  DeleteRoleUseCase,
  GetAllRolesUseCase,
  GetRoleUseCase,
  UpdateRoleUseCase,
} from '../../domain/use_cases/role';

export class RoleController {
  private readonly roleRepository: RoleRepository;

  constructor(roleRepository: RoleRepository) {
    this.roleRepository = roleRepository;
  }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Internal Server Error' });
  };

  createRole = async (req: Request, res: Response) => {
    try {
      const data = await new CreateRoleUseCase(this.roleRepository).execute(
        req.body,
      );

      return res.status(201).json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  };

  updateRole = async (req: Request, res: Response) => {
    try {
      const data = await new UpdateRoleUseCase(this.roleRepository).execute({
        ...req.params,
        ...req.body,
      });
      return res.status(200).json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  };

  getRole = async (req: Request, res: Response) => {
    try {
      const data = await new GetRoleUseCase(this.roleRepository).execute({
        id: req.params.id,
      });
      return res.status(200).json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  };

  getAllRoles = async (req: Request, res: Response) => {
    try {
      const data = await new GetAllRolesUseCase(this.roleRepository).execute(
        req.query,
      );
      return res.status(200).json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  };

  deleteRole = async (req: Request, res: Response) => {
    try {
      const data = await new DeleteRoleUseCase(this.roleRepository).execute({
        id: req.params.id,
      });
      return res.status(200).json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  };
}
