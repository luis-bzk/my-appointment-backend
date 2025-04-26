import { Role } from '../../entities';
import { RoleRepository } from '../../../adapters/repositories';
import {
  GetAllRolesDto,
  GetAllRolesPortDto,
  GetAllRolesSchema,
} from '../../schemas/role';
import { CustomError } from '../../errors';

export class GetAllRolesUseCase {
  private readonly roleRepository: RoleRepository;

  constructor(roleRepository: RoleRepository) {
    this.roleRepository = roleRepository;
  }

  async execute(dto: GetAllRolesPortDto): Promise<Role[]> {
    const { success, error, data: schema } = GetAllRolesSchema.safeParse(dto);
    if (!success) {
      const message = error.errors[0]?.message || 'Datos inválidos';
      throw CustomError.badRequest(message);
    }

    const parsedSchema: GetAllRolesDto = {
      limit: parseInt(schema.limit ?? '', 10),
      offset: parseInt(schema.offset ?? '', 10),
    };

    return await this.roleRepository.getAllRoles(parsedSchema);
  }
}
