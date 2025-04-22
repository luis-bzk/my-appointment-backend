import { Request, Response } from 'express';

import { CustomError } from '../../domain/errors';
import { RoleRepository } from '../../adapters/repositories';
import {
  CreateRoleDto,
  DeleteRoleDto,
  GetAllRolesDto,
  GetRoleDto,
  UpdateRoleDto,
} from '../../domain/dtos/role';
import {
  CreateRole,
  DeleteRole,
  GetAllRoles,
  GetRole,
  UpdateRole,
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
      const [error, createRoleDto] = CreateRoleDto.create(req.body);
      if (error) return res.status(400).json({ message: error });

      const data = await new CreateRole(this.roleRepository).execute(
        createRoleDto!,
      );

      return res.status(201).json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  };

  updateRole = async (req: Request, res: Response) => {
    try {
      const [error, updateRoleDto] = UpdateRoleDto.create(req.params, req.body);
      if (error) return res.status(400).json({ message: error });

      const data = await new UpdateRole(this.roleRepository).execute(
        updateRoleDto!,
      );
      return res.status(200).json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  };

  getRole = async (req: Request, res: Response) => {
    try {
      const [error, getRoleDto] = GetRoleDto.create(req.params);
      if (error) return res.status(400).json({ message: error });

      const data = await new GetRole(this.roleRepository).execute(getRoleDto!);
      return res.status(200).json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  };

  getAllRoles = async (req: Request, res: Response) => {
    try {
      const [error, getAllRolesDto] = GetAllRolesDto.create(req.query);
      if (error) return res.status(400).json({ message: error });

      const data = await new GetAllRoles(this.roleRepository).execute(
        getAllRolesDto!,
      );
      return res.status(200).json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  };

  deleteRole = async (req: Request, res: Response) => {
    try {
      const [error, deleteToleDto] = DeleteRoleDto.create(req.params);
      if (error) return res.status(400).json({ message: error });

      const data = await new DeleteRole(this.roleRepository).execute(
        deleteToleDto!,
      );
      return res.status(200).json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  };
}
