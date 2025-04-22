import { CustomError } from '../../errors';
import { Role } from '../../entities';
import { RoleRepository } from '../../../adapters/repositories';
import { UpdateRoleDto } from '../../dtos/role';

interface UpdateRoleUseCase {
  execute(updateRoleDto: UpdateRoleDto): Promise<Role>;
}

export class UpdateRole implements UpdateRoleUseCase {
  private readonly roleRepository: RoleRepository;

  constructor(roleRepository: RoleRepository) {
    this.roleRepository = roleRepository;
  }

  async execute(updateRoleDto: UpdateRoleDto): Promise<Role> {
    const roleId = await this.roleRepository.findRoleById(updateRoleDto.id);
    if (!roleId) {
      throw CustomError.notFound('No se ha encontrado el rol a actualizar');
    }

    const roleNameId = await this.roleRepository.findRoleByNameId(
      updateRoleDto.id,
      updateRoleDto.name,
    );
    if (roleNameId) {
      throw CustomError.conflict(
        'Ya existe un rol diferente con el nombre ingresado',
      );
    }

    const updatedRole = await this.roleRepository.updateRole(updateRoleDto);
    if (!updatedRole) {
      throw CustomError.internalServer('No se pudo actualizar el rol');
    }

    return updatedRole;
  }
}
