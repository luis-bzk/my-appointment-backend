import { TotalQuery, UserRole } from '../../domain/entities';
import { UserRoleDataSource } from '../../ports/data_sources';
import { UserRoleRepository } from '../../ports/repositories';
import { TotalQueryMapper, UserRoleMapper } from '../mappers';
import {
  CreateUserRoleDto,
  UpdateUserRoleDto,
} from '../../domain/schemas/user_role';
import { GetAllFiltersDto } from '../../domain/schemas/general';

export class UserRoleRepositoryImpl implements UserRoleRepository {
  private readonly userRoleDataSource: UserRoleDataSource;

  constructor(userRoleDataSource: UserRoleDataSource) {
    this.userRoleDataSource = userRoleDataSource;
  }

  async findUserRole(
    createUserRoleDto: CreateUserRoleDto,
  ): Promise<UserRole | null> {
    const userRole =
      await this.userRoleDataSource.findUserRole(createUserRoleDto);
    return UserRoleMapper.entityFromObject(userRole);
  }

  async createUserRole(
    createUserRoleDto: CreateUserRoleDto,
  ): Promise<UserRole | null> {
    const userRole =
      await this.userRoleDataSource.createUserRole(createUserRoleDto);
    return UserRoleMapper.entityFromObject(userRole);
  }

  async findUserRoleId(id: number): Promise<UserRole | null> {
    const userRole = await this.userRoleDataSource.findUserRoleId(id);
    return UserRoleMapper.entityFromObject(userRole);
  }

  async findUserRoleSameRegister(
    updateUserRoleDto: UpdateUserRoleDto,
  ): Promise<UserRole | null> {
    const userRole =
      await this.userRoleDataSource.findUserRoleSameRegister(updateUserRoleDto);
    return UserRoleMapper.entityFromObject(userRole);
  }

  async updateUserRole(
    updateUserRoleDto: UpdateUserRoleDto,
  ): Promise<UserRole | null> {
    const userRole =
      await this.userRoleDataSource.updateUserRole(updateUserRoleDto);
    return UserRoleMapper.entityFromObject(userRole);
  }

  async getAll(getAllUsersRolesDto: GetAllFiltersDto): Promise<UserRole[]> {
    const userRoles =
      await this.userRoleDataSource.getAllUserRoles(getAllUsersRolesDto);
    return UserRoleMapper.entitiesFromArray(userRoles);
  }

  async delete(id: number): Promise<UserRole | null> {
    const userRole = await this.userRoleDataSource.deleteUserRole(id);
    return UserRoleMapper.entityFromObject(userRole);
  }

  async countAvailableRegisters(): Promise<TotalQuery | null> {
    const row = await this.userRoleDataSource.countAvailableRegisters();
    return TotalQueryMapper.mapTotalQuery(row);
  }
}
