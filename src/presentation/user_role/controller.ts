import { Request, Response } from 'express';

import {
  CreateUserRoleDto,
  DeleteUserRoleDto,
  GetAllUsersRolesDto,
  GetUserRoleDto,
  UpdateUserRoleDto,
} from '../../domain/dtos/user_role';
import {
  CreateUserRole,
  DeleteUserRole,
  GetAllUsersRoles,
  GetAllUsersRolesDetail,
  GetUserRole,
  UpdateUserRole,
} from '../../domain/use_cases/user_role';
import { CustomError } from '../../domain/errors';
import { UserRoleRepository } from '../../adapters/repositories';

export class UserRoleController {
  private readonly userRoleRepository: UserRoleRepository;

  constructor(userRoleREpository: UserRoleRepository) {
    this.userRoleRepository = userRoleREpository;
  }

  private handleError(error: unknown, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    // unknown error
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }

  createUserRole = (req: Request, res: Response) => {
    const [error, createUserRoleDto] = CreateUserRoleDto.create(req.body);
    if (error) return res.status(400).json({ error: error });

    new CreateUserRole(this.userRoleRepository)
      .execute(createUserRoleDto!)
      .then((data) => res.status(201).json(data))
      .catch((error) => this.handleError(error, res));
  };

  updateUserRole = (req: Request, res: Response) => {
    const [error, updateUserRoleDto] = UpdateUserRoleDto.create(
      req.body,
      req.params,
    );
    if (error) return res.status(400).json({ error: error });

    new UpdateUserRole(this.userRoleRepository)
      .execute(updateUserRoleDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  getUserRole = (req: Request, res: Response) => {
    const [error, getUserRoleDto] = GetUserRoleDto.create(req.params);
    if (error) return res.status(400).json({ error: error });

    new GetUserRole(this.userRoleRepository)
      .execute(getUserRoleDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  getAllUsersRoles = (req: Request, res: Response) => {
    const [error, getAllUsersRolesDto] = GetAllUsersRolesDto.create(req.query);
    if (error) return res.status(400).json({ error: error });

    new GetAllUsersRoles(this.userRoleRepository)
      .execute(getAllUsersRolesDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  getAllUsersRolesDetail = (req: Request, res: Response) => {
    const [error, getAllUsersRolesDto] = GetAllUsersRolesDto.create(req.query);
    if (error) return res.status(400).json({ error: error });

    new GetAllUsersRolesDetail(this.userRoleRepository)
      .execute(getAllUsersRolesDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  deleteUserRole = (req: Request, res: Response) => {
    const [error, deleteUserRoleDto] = DeleteUserRoleDto.create(req.params);
    if (error) return res.status(400).json({ error: error });

    new DeleteUserRole(this.userRoleRepository)
      .execute(deleteUserRoleDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };
}
