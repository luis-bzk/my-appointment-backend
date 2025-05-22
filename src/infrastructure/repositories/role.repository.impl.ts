import { Role } from '../../domain/entities';
import { RoleRepository } from '../../ports/repositories';
import { RoleDataSource } from '../../ports/data_sources';
import { RoleMapper } from '../mappers';
import { CreateRoleDto, UpdateRoleDto } from '../../domain/schemas/role';
import { GetAllFiltersDto } from '../../domain/schemas/general';

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

  async getAllRoles(getAllRolesDto: GetAllFiltersDto): Promise<Role[]> {
    const roles = await this.roleDataSource.getAllRoles(getAllRolesDto);
    return RoleMapper.entitiesFromArray(roles);
  }

  async deleteRole(id: number): Promise<Role | null> {
    const role = await this.roleDataSource.deleteRole(id);
    return RoleMapper.entityFromObject(role);
  }

  async getRolesById(ids: number[]): Promise<Role[]> {
    const roles = await this.roleDataSource.getRolesById(ids);
    return RoleMapper.entitiesFromArray(roles);
  }
}
