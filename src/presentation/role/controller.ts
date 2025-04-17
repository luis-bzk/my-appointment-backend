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
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log({ error });
    return res.status(500).json({ error: 'Internal Server Error' });
  };

  createRole = (req: Request, res: Response) => {
    const [error, createRoleDto] = CreateRoleDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new CreateRole(this.roleRepository)
      .execute(createRoleDto!)
      .then((data) => res.status(201).json(data))
      .catch((error) => this.handleError(error, res));
  };

  updateRole = (req: Request, res: Response) => {
    const [error, updateRoleDto] = UpdateRoleDto.create(req.params, req.body);
    if (error) return res.status(400).json({ error });

    new UpdateRole(this.roleRepository)
      .execute(updateRoleDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  getRole = (req: Request, res: Response) => {
    const [error, getRoleDto] = GetRoleDto.create(req.params);
    if (error) return res.status(400).json({ error });

    new GetRole(this.roleRepository)
      .execute(getRoleDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  getAllRoles = (req: Request, res: Response) => {
    const [error, getAllRolesDto] = GetAllRolesDto.create(req.query);
    if (error) return res.status(400).json({ error });

    new GetAllRoles(this.roleRepository)
      .execute(getAllRolesDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  deleteRole = (req: Request, res: Response) => {
    const [error, deleteToleDto] = DeleteRoleDto.create(req.params);
    if (error) return res.status(400).json({ error });

    new DeleteRole(this.roleRepository)
      .execute(deleteToleDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };
}
