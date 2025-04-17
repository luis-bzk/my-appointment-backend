import { UserRole, UserRoleDetail } from '../../domain/entities';
import {
  CreateUserRoleDto,
  DeleteUserRoleDto,
  GetAllUsersRolesDto,
  GetUserRoleDto,
  UpdateUserRoleDto,
} from '../../domain/dtos/user_role';

export abstract class UserRoleDataSource {
  abstract create(createUserRoleDto: CreateUserRoleDto): Promise<UserRole>;

  abstract update(updateUserRoleDto: UpdateUserRoleDto): Promise<UserRole>;

  abstract get(getUserRoleDto: GetUserRoleDto): Promise<UserRole>;

  abstract getAll(
    getAllUsersRolesDto: GetAllUsersRolesDto,
  ): Promise<UserRole[]>;

  abstract getAllDetail(
    getAllUsersRolesDto: GetAllUsersRolesDto,
  ): Promise<UserRoleDetail[]>;

  abstract delete(deleteUserRoleDto: DeleteUserRoleDto): Promise<UserRole>;
}
