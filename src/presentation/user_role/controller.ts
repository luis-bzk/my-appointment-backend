import { Request, Response } from 'express';

import {
  CreateUserRoleUseCase,
  DeleteUserRoleUseCase,
  GetAllUsersRolesDetailUseCase,
  GetUserRoleUseCase,
  UpdateUserRoleUseCase,
} from '../../domain/use_cases/user_role';
import {
  RoleRepository,
  UserRepository,
  UserRoleRepository,
} from '../../ports/repositories';
import {
  GetUserUseCase,
  GetUsersByIdUseCase,
} from '../../domain/use_cases/user';
import {
  GetRoleUseCase,
  GetRolesByIdUseCase,
} from '../../domain/use_cases/role';
import { BaseController } from '../BaseController';

export class UserRoleController extends BaseController {
  private readonly userRoleRepository: UserRoleRepository;
  private readonly userRepository: UserRepository;
  private readonly roleRepository: RoleRepository;

  constructor(
    userRoleREpository: UserRoleRepository,
    userRepository: UserRepository,
    roleRepository: RoleRepository,
  ) {
    super();
    this.userRoleRepository = userRoleREpository;
    this.userRepository = userRepository;
    this.roleRepository = roleRepository;
  }

  createUserRole = async (req: Request, res: Response) => {
    try {
      const data = await new CreateUserRoleUseCase(
        this.userRoleRepository,
      ).execute(req.body);
      return res.status(201).json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  };

  updateUserRole = async (req: Request, res: Response) => {
    try {
      const data = await new UpdateUserRoleUseCase(
        this.userRoleRepository,
      ).execute({
        ...req.params,
        ...req.body,
      });
      return res.status(200).json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  };

  getUserRole = async (req: Request, res: Response) => {
    try {
      const userRole = await new GetUserRoleUseCase(
        this.userRoleRepository,
      ).execute({
        id: req.params.id,
      });

      const user = await new GetUserUseCase(this.userRepository).execute({
        id: userRole.id_user.toString(),
      });

      const role = await new GetRoleUseCase(this.roleRepository).execute({
        id: userRole.id_role.toString(),
      });

      return res.status(200).json({ user, role });
    } catch (err) {
      this.handleError(err, res);
    }
  };

  getAllUsersRoles = async (req: Request, res: Response) => {
    try {
      const { registers, totalRegisters } =
        await new GetAllUsersRolesDetailUseCase(
          this.userRoleRepository,
        ).execute(req.query);

      const usersIds = registers.map((userRole) => userRole.id_user);
      const rolesIds = registers.map((userRole) => userRole.id_role);

      const [users, roles] = await Promise.all([
        new GetUsersByIdUseCase(this.userRepository).execute({ ids: usersIds }),
        new GetRolesByIdUseCase(this.roleRepository).execute(rolesIds),
      ]);

      const usersMap = new Map(users.map((u) => [u.id, u]));
      const rolesMap = new Map(roles.map((r) => [r.id, r]));
      const userRoles = registers.map((ur) => ({
        id: ur.id,
        record_status: ur.record_status,
        created_date: ur.created_date,
        user: usersMap.get(ur.id_user),
        role: rolesMap.get(ur.id_role),
      }));
      return res.status(200).json({ totalRegisters, userRoles });
    } catch (err) {
      this.handleError(err, res);
    }
  };

  deleteUserRole = async (req: Request, res: Response) => {
    try {
      const data = await new DeleteUserRoleUseCase(
        this.userRoleRepository,
      ).execute({ id: req.params.id });
      return res.status(200).json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  };
}
