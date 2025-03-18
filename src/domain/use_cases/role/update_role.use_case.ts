import { Role } from '../../entities';
import { UpdateRoleDto } from '../../dtos/role';
import { RoleRepository } from '../../repositories';

interface UpdateRoleUseCase {
  execute(updateRoleDto: UpdateRoleDto): Promise<Role>;
}

export class UpdateRole implements UpdateRoleUseCase {
  private readonly roleRepository: RoleRepository;

  constructor(roleRepository: RoleRepository) {
    this.roleRepository = roleRepository;
  }

  async execute(updateRoleDto: UpdateRoleDto): Promise<Role> {
    return this.roleRepository.update(updateRoleDto);
  }
}
