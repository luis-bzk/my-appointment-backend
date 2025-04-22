import { Role } from '../../entities';
import { GetRoleDto } from '../../dtos/role';
import { RoleRepository } from '../../../adapters/repositories';
import { CustomError } from '../../errors';

interface GetRoleUseCase {
  execute(getRoleDto: GetRoleDto): Promise<Role>;
}

export class GetRole implements GetRoleUseCase {
  private readonly roleRepository: RoleRepository;

  constructor(roleRepository: RoleRepository) {
    this.roleRepository = roleRepository;
  }

  async execute(getRoleDto: GetRoleDto): Promise<Role> {
    const role = await this.roleRepository.findRoleById(getRoleDto.id);
    if (!role) {
      throw CustomError.notFound('No se ha encontrado el rol deseado');
    }

    return role;
  }
}
