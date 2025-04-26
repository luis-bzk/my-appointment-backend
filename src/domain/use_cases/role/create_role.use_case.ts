import { Role } from '../../entities';
import { RoleRepository } from '../../../adapters/repositories';
import { CustomError } from '../../errors';
import { CreateRoleDto, CreateRoleSchema } from '../../schemas/role';

export class CreateRoleUseCase {
  private readonly roleRepository: RoleRepository;

  constructor(roleRepository: RoleRepository) {
    this.roleRepository = roleRepository;
  }

  async execute(body: CreateRoleDto): Promise<Role> {
    const { success, error, data: schema } = CreateRoleSchema.safeParse(body);

    if (!success) {
      const message = error.errors[0]?.message || 'Datos inválidos';
      throw CustomError.badRequest(message);
    }

    const roleName = await this.roleRepository.findRoleByName(
      schema.name.toLocaleLowerCase(),
    );
    if (!roleName) {
      throw CustomError.conflict('Ya existe un rol con el nombre ingresado');
    }

    const roleCreated = await this.roleRepository.createRole(schema);
    if (!roleCreated) {
      throw CustomError.internalServer('No se pudo crear el rol');
    }
    return roleCreated;
  }
}
