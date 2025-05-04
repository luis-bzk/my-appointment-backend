import { CustomError } from '../../errors';
import { Role } from '../../entities';
import { RoleRepository } from '../../../ports/repositories';
import {
  UpdateRoleDto,
  UpdateRolePortDto,
  UpdateRoleSchema,
} from '../../schemas/role';

export class UpdateRoleUseCase {
  private readonly roleRepository: RoleRepository;

  constructor(roleRepository: RoleRepository) {
    this.roleRepository = roleRepository;
  }

  async execute(dto: UpdateRolePortDto): Promise<Role> {
    const { success, error, data: schema } = UpdateRoleSchema.safeParse(dto);

    if (!success) {
      const message = error.errors[0]?.message || 'Datos inválidos';
      throw CustomError.badRequest(message);
    }

    const schemaParsed: UpdateRoleDto = {
      ...schema,
      id: parseInt(schema.id, 10),
    };

    const roleId = await this.roleRepository.findRoleById(schemaParsed.id);
    if (!roleId) {
      throw CustomError.notFound('No se ha encontrado el rol a actualizar');
    }

    const roleNameId = await this.roleRepository.findRoleByNameId(
      schemaParsed.id,
      schema.name,
    );
    if (roleNameId) {
      throw CustomError.conflict(
        'Ya existe un rol diferente con el nombre ingresado',
      );
    }

    const updatedRole = await this.roleRepository.updateRole(schemaParsed);
    if (!updatedRole) {
      throw CustomError.internalServer('No se pudo actualizar el rol');
    }

    return updatedRole;
  }
}
