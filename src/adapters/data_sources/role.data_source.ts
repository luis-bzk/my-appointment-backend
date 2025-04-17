import {
  CreateRoleDto,
  DeleteRoleDto,
  GetAllRolesDto,
  GetRoleDto,
  UpdateRoleDto,
} from '../../domain/dtos/role';
import { Role } from '../../domain/entities';

export abstract class RoleDataSource {
  abstract create(createRoleDto: CreateRoleDto): Promise<Role>;

  abstract update(updateRoleDto: UpdateRoleDto): Promise<Role>;

  abstract get(getRoleDto: GetRoleDto): Promise<Role>;

  abstract getAll(getAllRolesDto: GetAllRolesDto): Promise<Role[]>;

  abstract delete(deleteRoleDto: DeleteRoleDto): Promise<Role>;
}
