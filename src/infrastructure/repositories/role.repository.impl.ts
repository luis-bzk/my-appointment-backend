import {
  CreateRoleDto,
  GetAllRolesDto,
  UpdateRoleDto,
} from '../../domain/dtos/role';
import { Role } from '../../domain/entities';
import { RoleRepository } from '../../adapters/repositories';
import { RoleDataSource } from '../../adapters/data_sources';
import { RoleMapper } from '../mappers';

export class RoleRepositoryImpl implements RoleRepository {
  private readonly roleDataSource: RoleDataSource;

  constructor(roleDataSource: RoleDataSource) {
    this.roleDataSource = roleDataSource;
  }

  async findRoleByName(name: string): Promise<Role | null> {
    const role = await this.roleDataSource.findRoleByName(name);
    return RoleMapper.entityFromObject(role);
  }

  async createRole(createRoleDto: CreateRoleDto): Promise<Role | null> {
    const role = await this.roleDataSource.createRole(createRoleDto);
    return RoleMapper.entityFromObject(role);
  }

  async findRoleById(id: number): Promise<Role | null> {
    const role = await this.roleDataSource.findRoleById(id);
    return RoleMapper.entityFromObject(role);
  }

  async findRoleByNameId(id: number, name: string): Promise<Role | null> {
    const role = await this.roleDataSource.findRoleByNameId(id, name);
    return RoleMapper.entityFromObject(role);
  }

  async updateRole(updateRoleDto: UpdateRoleDto): Promise<Role | null> {
    const role = await this.roleDataSource.updateRole(updateRoleDto);
    return RoleMapper.entityFromObject(role);
  }

  async getAllRoles(getAllRolesDto: GetAllRolesDto): Promise<Role[]> {
    const roles = await this.roleDataSource.getAllRoles(getAllRolesDto);
    return RoleMapper.entitiesFromArray(roles);
  }

  async deleteRole(id: number): Promise<Role | null> {
    const role = await this.roleDataSource.deleteRole(id);
    return RoleMapper.entityFromObject(role);
  }
}
