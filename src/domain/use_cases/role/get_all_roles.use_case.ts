import { Role } from '../../entities';
import { RoleRepository } from '../../../ports/repositories';
import { CustomError } from '../../errors';
import {
  GetAllFiltersDto,
  GetAllFiltersPortDto,
  GetAllFiltersSchema,
} from '../../schemas/general';

export class GetAllRolesUseCase {
  private readonly roleRepository: RoleRepository;

  constructor(roleRepository: RoleRepository) {
    this.roleRepository = roleRepository;
  }

  async execute(dto: GetAllFiltersPortDto): Promise<Role[]> {
    const { success, error, data: schema } = GetAllFiltersSchema.safeParse(dto);
    if (!success) {
      const message = error.errors[0]?.message || 'Datos inválidos';
      throw CustomError.badRequest(message);
    }

    const parsedSchema: GetAllFiltersDto = {
      ...schema,
      limit: schema.limit ? parseInt(schema.limit ?? '', 10) : 50,
      offset: schema.offset ? parseInt(schema.offset ?? '', 10) : undefined,
    };

    return await this.roleRepository.getAllRoles(parsedSchema);
  }
}
