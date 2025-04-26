import { Role } from '../../entities';
import { RoleRepository } from '../../../adapters/repositories';

export class GetRolesByIdUseCase {
  private readonly roleRepository: RoleRepository;

  constructor(roleRepository: RoleRepository) {
    this.roleRepository = roleRepository;
  }

  async execute(ids: number[]): Promise<Role[]> {
    return await this.roleRepository.getRolesById(ids);
  }
}
