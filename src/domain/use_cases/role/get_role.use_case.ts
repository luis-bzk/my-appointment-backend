import { Role } from '../../entities';
import { RoleRepository } from '../../../ports/repositories';
import { CustomError } from '../../errors';
import { RoleIdDto, RoleIdPortDto, RoleIdSchema } from '../../schemas/role';

export class GetRoleUseCase {
  private readonly roleRepository: RoleRepository;

  constructor(roleRepository: RoleRepository) {
    this.roleRepository = roleRepository;
  }

  async execute(dto: RoleIdPortDto): Promise<Role> {
    const { success, error, data: schema } = RoleIdSchema.safeParse(dto);
    if (!success) {
      const message = error.errors[0]?.message || 'Datos inválidos';
      throw CustomError.badRequest(message);
    }

    const parsedSchema: RoleIdDto = {
      id: parseInt(schema.id, 10),
    };

    const role = await this.roleRepository.findRoleById(parsedSchema.id);
    if (!role) {
      throw CustomError.notFound('No se ha encontrado el rol deseado');
    }

    return role;
  }
}
