import { TotalQueryDB, UserRoleDB } from '../../data/interfaces';
import {
  CreateUserRoleDto,
  GetAllUsersRolesDto,
  UpdateUserRoleDto,
} from '../../domain/schemas/user_role';

export abstract class UserRoleDataSource {
  abstract findUserRole(
    createUserRoleDto: CreateUserRoleDto,
  ): Promise<UserRoleDB>;

  abstract createUserRole(
    createUserRoleDto: CreateUserRoleDto,
  ): Promise<UserRoleDB>;

  abstract findUserRoleId(id: number): Promise<UserRoleDB>;

  abstract findUserRoleSameRegister(
    updateUserRoleDto: UpdateUserRoleDto,
  ): Promise<UserRoleDB>;

  abstract updateUserRole(
    updateUserRoleDto: UpdateUserRoleDto,
  ): Promise<UserRoleDB>;

  abstract getAllUserRoles(
    getAllUsersRolesDto: GetAllUsersRolesDto,
  ): Promise<UserRoleDB[]>;

  abstract deleteUserRole(id: number): Promise<UserRoleDB>;

  abstract countAvailableRegisters(): Promise<TotalQueryDB | null>;
}
