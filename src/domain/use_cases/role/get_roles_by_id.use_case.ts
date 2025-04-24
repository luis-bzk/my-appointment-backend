import { Role } from '../../entities';
import { RoleRepository } from '../../../adapters/repositories';

interface GetRolesByIdUseCase {
  execute(ids: number[]): Promise<Role[]>;
}

export class GetRolesById implements GetRolesByIdUseCase {
  private readonly roleRepository: RoleRepository;

  constructor(roleRepository: RoleRepository) {
    this.roleRepository = roleRepository;
  }

  async execute(ids: number[]): Promise<Role[]> {
    return await this.roleRepository.getRolesById(ids);
  }
}
