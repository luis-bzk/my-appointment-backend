import { TotalQuery, UserRole } from '../../domain/entities';
import { GetAllFiltersDto } from '../../domain/schemas/general';
import {
  CreateUserRoleDto,
  UpdateUserRoleDto,
} from '../../domain/schemas/user_role';

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

  abstract getAll(getAllUsersRolesDto: GetAllFiltersDto): Promise<UserRole[]>;

  abstract delete(id: number): Promise<UserRole | null>;

  abstract countAvailableRegisters(): Promise<TotalQuery | null>;
}
