import { Role } from '../../entities';
import { CreateRoleDto } from '../../dtos/role';
import { RoleRepository } from '../../../adapters/repositories';

interface CreateRoleUseCase {
  execute(createRoleDto: CreateRoleDto): Promise<Role>;
}

export class CreateRole implements CreateRoleUseCase {
  private readonly roleRepository: RoleRepository;

  constructor(roleRepository: RoleRepository) {
    this.roleRepository = roleRepository;
  }

  async execute(createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleRepository.create(createRoleDto);
  }
}
