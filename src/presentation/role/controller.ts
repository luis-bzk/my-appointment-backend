import { Request, Response } from 'express';

import { RoleRepository } from '../../ports/repositories';
import {
  CreateRoleUseCase,
  DeleteRoleUseCase,
  GetAllRolesUseCase,
  GetRoleUseCase,
  UpdateRoleUseCase,
} from '../../domain/use_cases/role';
import { BaseController } from '../BaseController';

export class RoleController extends BaseController {
  private readonly roleRepository: RoleRepository;

  constructor(roleRepository: RoleRepository) {
    super();
    this.roleRepository = roleRepository;
  }

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
