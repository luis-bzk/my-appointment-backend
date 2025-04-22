import { Role } from '../../entities';
import { CreateRoleDto } from '../../dtos/role';
import { RoleRepository } from '../../../adapters/repositories';
import { CustomError } from '../../errors';

interface CreateRoleUseCase {
  execute(createRoleDto: CreateRoleDto): Promise<Role>;
}

export class CreateRole implements CreateRoleUseCase {
  private readonly roleRepository: RoleRepository;

  constructor(roleRepository: RoleRepository) {
    this.roleRepository = roleRepository;
  }

  async execute(createRoleDto: CreateRoleDto): Promise<Role> {
    const roleName = await this.roleRepository.findRoleByName(
      createRoleDto.name.toLocaleLowerCase(),
    );
    if (!roleName) {
      throw CustomError.conflict('Ya existe un rol con el nombre ingresado');
    }

    const roleCreated = await this.roleRepository.createRole(createRoleDto);
    if (!roleCreated) {
      throw CustomError.internalServer('No se pudo crear el rol');
    }
    return roleCreated;
  }
}
