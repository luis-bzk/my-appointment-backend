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
  GetAllUsersRolesDetail,
  GetUserRole,
  UpdateUserRole,
} from '../../domain/use_cases/user_role';
import { CustomError } from '../../domain/errors';
import {
  RoleRepository,
  UserRepository,
  UserRoleRepository,
} from '../../adapters/repositories';
import { GetUser, GetUsersById } from '../../domain/use_cases/user';
import { GetUserDto } from '../../domain/dtos/user';
import { GetRoleDto } from '../../domain/dtos/role';
import { GetRole, GetRolesById } from '../../domain/use_cases/role';

export class UserRoleController {
  private readonly userRoleRepository: UserRoleRepository;
  private readonly userRepository: UserRepository;
  private readonly roleRepository: RoleRepository;

  constructor(
    userRoleREpository: UserRoleRepository,
    userRepository: UserRepository,
    roleRepository: RoleRepository,
  ) {
    this.userRoleRepository = userRoleREpository;
    this.userRepository = userRepository;
    this.roleRepository = roleRepository;
  }

  private handleError(error: unknown, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    // unknown error
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }

  createUserRole = async (req: Request, res: Response) => {
    try {
      const [error, createUserRoleDto] = CreateUserRoleDto.create(req.body);
      if (error) return res.status(400).json({ message: error });

      const data = await new CreateUserRole(this.userRoleRepository).execute(
        createUserRoleDto!,
      );
      return res.status(201).json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  };

  updateUserRole = async (req: Request, res: Response) => {
    try {
      const [error, updateUserRoleDto] = UpdateUserRoleDto.create(
        req.body,
        req.params,
      );
      if (error) return res.status(400).json({ message: error });

      const data = await new UpdateUserRole(this.userRoleRepository).execute(
        updateUserRoleDto!,
      );
      return res.status(200).json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  };

  getUserRole = async (req: Request, res: Response) => {
    try {
      const [error, getUserRoleDto] = GetUserRoleDto.create(req.params);
      if (error) return res.status(400).json({ message: error });

      const userRole = await new GetUserRole(this.userRoleRepository).execute(
        getUserRoleDto!,
      );

      const [errorUser, getUserDto] = GetUserDto.create({
        id: userRole.id_user.toString(),
      });
      if (errorUser) return res.status(400).json({ message: errorUser });
      const user = await new GetUser(this.userRepository).execute(getUserDto!);

      const [erroRole, getRoleDto] = GetRoleDto.create({
        id: userRole.id_role.toString(),
      });
      if (erroRole) return res.status(400).json({ message: erroRole });
      const role = await new GetRole(this.roleRepository).execute(getRoleDto!);

      return res.status(200).json({ user, role });
    } catch (err) {
      this.handleError(err, res);
    }
  };

  getAllUsersRoles = async (req: Request, res: Response) => {
    try {
      const [error, getAllUsersRolesDto] = GetAllUsersRolesDto.create(
        req.query,
      );
      if (error) return res.status(400).json({ message: error });
      const userRoles = await new GetAllUsersRolesDetail(
        this.userRoleRepository,
      ).execute(getAllUsersRolesDto!);

      const usersIds = userRoles.map((userRole) => userRole.id_user);
      const rolesIds = userRoles.map((userRole) => userRole.id_role);

      const [users, roles] = await Promise.all([
        new GetUsersById(this.userRepository).execute(usersIds),
        new GetRolesById(this.roleRepository).execute(rolesIds),
      ]);

      const usersMap = new Map(users.map((u) => [u.id, u]));
      const rolesMap = new Map(roles.map((r) => [r.id, r]));

      return res.status(200).json(
        userRoles.map((ur) => ({
          user: usersMap.get(ur.id_user),
          role: rolesMap.get(ur.id_role),
        })),
      );
    } catch (err) {
      this.handleError(err, res);
    }
  };

  deleteUserRole = async (req: Request, res: Response) => {
    try {
      const [error, deleteUserRoleDto] = DeleteUserRoleDto.create(req.params);
      if (error) return res.status(400).json({ message: error });

      const data = await new DeleteUserRole(this.userRoleRepository).execute(
        deleteUserRoleDto!,
      );
      return res.status(200).json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  };
}
