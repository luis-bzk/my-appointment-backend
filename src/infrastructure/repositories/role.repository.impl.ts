import {
  CreateRoleDto,
  DeleteRoleDto,
  GetAllRolesDto,
  GetRoleDto,
  UpdateRoleDto,
} from '../../domain/dtos/role';
import { Role } from '../../domain/entities';
import { RoleRepository } from '../../domain/repositories';
import { RoleDataSource } from '../../domain/data_sources';

export class RoleRepositoryImpl implements RoleRepository {
  private readonly roleDataSource: RoleDataSource;

  constructor(roleDataSource: RoleDataSource) {
    this.roleDataSource = roleDataSource;
  }

  create(createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleDataSource.create(createRoleDto);
  }

  update(updateRoleDto: UpdateRoleDto): Promise<Role> {
    return this.roleDataSource.update(updateRoleDto);
  }

  get(getRoleDto: GetRoleDto): Promise<Role> {
    return this.roleDataSource.get(getRoleDto);
  }

  getAll(getAllRolesDto: GetAllRolesDto): Promise<Role[]> {
    return this.roleDataSource.getAll(getAllRolesDto);
  }

  delete(deleteRoleDto: DeleteRoleDto): Promise<Role> {
    return this.roleDataSource.delete(deleteRoleDto);
  }
}
