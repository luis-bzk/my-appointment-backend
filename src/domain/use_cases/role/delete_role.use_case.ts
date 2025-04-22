import { Role } from '../../entities';
import { DeleteRoleDto } from '../../dtos/role';
import { RoleRepository } from '../../../adapters/repositories';
import { CustomError } from '../../errors';

interface DeleteRoleUseCase {
  execute(deleteRoleDto: DeleteRoleDto): Promise<Role>;
}

export class DeleteRole implements DeleteRoleUseCase {
  private readonly roleRepository: RoleRepository;

  constructor(roleRepository: RoleRepository) {
    this.roleRepository = roleRepository;
  }

  async execute(deleteRoleDto: DeleteRoleDto): Promise<Role> {
    const roleId = await this.roleRepository.findRoleById(deleteRoleDto.id);
    if (!roleId) {
      throw CustomError.notFound('No se ha encontrado el rol a eliminar');
    }

    const deletedRole = await this.roleRepository.deleteRole(deleteRoleDto.id);
    if (!deletedRole) {
      throw CustomError.internalServer('No se pudo eliminar el rol');
    }

    return deletedRole;
  }
}
