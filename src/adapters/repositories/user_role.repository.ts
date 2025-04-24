import {
  CreateUserRoleDto,
  GetAllUsersRolesDto,
  UpdateUserRoleDto,
} from '../../domain/dtos/user_role';
import { UserRole } from '../../domain/entities';

export abstract class UserRoleRepository {
  abstract findUserRole(
    createUserRoleDto: CreateUserRoleDto,
  ): Promise<UserRole | null>;

  abstract createUserRole(
    createUserRoleDto: CreateUserRoleDto,
  ): Promise<UserRole | null>;

  abstract findUserRoleId(id: number): Promise<UserRole | null>;

  abstract findUserRoleSameRegister(
    updateUserRoleDto: UpdateUserRoleDto,
  ): Promise<UserRole | null>;

  abstract updateUserRole(
    updateUserRoleDto: UpdateUserRoleDto,
  ): Promise<UserRole | null>;

  abstract getAll(
    getAllUsersRolesDto: GetAllUsersRolesDto,
  ): Promise<UserRole[]>;

  abstract delete(id: number): Promise<UserRole | null>;
}
