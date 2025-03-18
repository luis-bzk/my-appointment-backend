import { Role } from '../../entities';
import { DeleteRoleDto } from '../../dtos/role';
import { RoleRepository } from '../../repositories';

interface DeleteRoleUseCase {
  execute(deleteRoleDto: DeleteRoleDto): Promise<Role>;
}

export class DeleteRole implements DeleteRoleUseCase {
  private readonly roleRepository: RoleRepository;

  constructor(roleRepository: RoleRepository) {
    this.roleRepository = roleRepository;
  }

  async execute(deleteRoleDto: DeleteRoleDto): Promise<Role> {
    return this.roleRepository.delete(deleteRoleDto);
  }
}
