import { Role } from '../../entities';
import { GetRoleDto } from '../../dtos/role';
import { RoleRepository } from '../../repositories';

interface GetRoleUseCase {
  execute(getRoleDto: GetRoleDto): Promise<Role>;
}

export class GetRole implements GetRoleUseCase {
  private readonly roleRepository: RoleRepository;

  constructor(roleRepository: RoleRepository) {
    this.roleRepository = roleRepository;
  }

  async execute(getRoleDto: GetRoleDto): Promise<Role> {
    return this.roleRepository.get(getRoleDto);
  }
}
