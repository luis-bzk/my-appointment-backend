import {
  CreateUserRoleDto,
  DeleteUserRoleDto,
  GetAllUsersRolesDto,
  GetUserRoleDto,
  UpdateUserRoleDto,
} from '../../domain/dtos/user_role';
import { UserRole, UserRoleDetail } from '../../domain/entities';
import { UserRoleDataSource } from '../../adapters/data_sources';
import { UserRoleRepository } from '../../adapters/repositories';

export class UserRoleRepositoryImpl implements UserRoleRepository {
  private readonly userRoleDataSource: UserRoleDataSource;

  constructor(userRoleDataSource: UserRoleDataSource) {
    this.userRoleDataSource = userRoleDataSource;
  }

  create(createUserRoleDto: CreateUserRoleDto): Promise<UserRole> {
    return this.userRoleDataSource.create(createUserRoleDto);
  }

  update(updateUserRoleDto: UpdateUserRoleDto): Promise<UserRole> {
    return this.userRoleDataSource.update(updateUserRoleDto);
  }

  get(getUserRoleDto: GetUserRoleDto): Promise<UserRole> {
    return this.userRoleDataSource.get(getUserRoleDto);
  }

  getAll(getAllUsersRolesDto: GetAllUsersRolesDto): Promise<UserRole[]> {
    return this.userRoleDataSource.getAll(getAllUsersRolesDto);
  }

  getAllDetail(
    getAllUsersRolesDto: GetAllUsersRolesDto,
  ): Promise<UserRoleDetail[]> {
    return this.userRoleDataSource.getAllDetail(getAllUsersRolesDto);
  }

  delete(deleteUserRoleDto: DeleteUserRoleDto): Promise<UserRole> {
    return this.userRoleDataSource.delete(deleteUserRoleDto);
  }
}
