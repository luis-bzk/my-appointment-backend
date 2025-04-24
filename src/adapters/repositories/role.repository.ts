import {
  CreateRoleDto,
  GetAllRolesDto,
  UpdateRoleDto,
} from '../../domain/dtos/role';
import { Role } from '../../domain/entities';

export abstract class RoleRepository {
  abstract findRoleByName(name: string): Promise<Role | null>;

  abstract createRole(createRoleDto: CreateRoleDto): Promise<Role | null>;

  abstract findRoleById(id: number): Promise<Role | null>;

  abstract findRoleByNameId(id: number, name: string): Promise<Role | null>;

  abstract updateRole(updateRoleDto: UpdateRoleDto): Promise<Role | null>;

  abstract getAllRoles(getAllRolesDto: GetAllRolesDto): Promise<Role[]>;

  abstract deleteRole(id: number): Promise<Role | null>;

  abstract getRolesById(ids: number[]): Promise<Role[]>;
}
