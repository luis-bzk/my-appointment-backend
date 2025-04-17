import { Role } from '../../entities';
import { GetAllRolesDto } from '../../dtos/role';
import { RoleRepository } from '../../../adapters/repositories';

interface GetAllRolesUseCase {
  execute(getAllRolesDto: GetAllRolesDto): Promise<Role[]>;
}

export class GetAllRoles implements GetAllRolesUseCase {
  private readonly roleRepository: RoleRepository;

  constructor(roleRepository: RoleRepository) {
    this.roleRepository = roleRepository;
  }

  async execute(getAllRolesDto: GetAllRolesDto): Promise<Role[]> {
    return this.roleRepository.getAll(getAllRolesDto);
  }
}
