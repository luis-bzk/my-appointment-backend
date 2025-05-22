import { UserRole } from '../../entities';
import { UserRoleRepository } from '../../../ports/repositories';

import { CustomError } from '../../errors';
import {
  GetAllFiltersDto,
  GetAllFiltersPortDto,
  GetAllFiltersSchema,
} from '../../schemas/general';

export class GetAllUsersRolesDetailUseCase {
  private readonly userRoleRepository: UserRoleRepository;

  constructor(userRoleRepository: UserRoleRepository) {
    this.userRoleRepository = userRoleRepository;
  }

  async execute(
    dto: GetAllFiltersPortDto,
  ): Promise<{ totalRegisters: number; registers: UserRole[] }> {
    const { success, error, data: schema } = GetAllFiltersSchema.safeParse(dto);

    if (!success) {
      const message = error.errors[0]?.message || 'Parámetros inválidos';
      throw CustomError.badRequest(message);
    }

    const parsedSchema: GetAllFiltersDto = {
      ...schema,
      limit: schema.limit ? parseInt(schema.limit ?? '', 10) : 50,
      offset: schema.offset ? parseInt(schema.offset ?? '', 10) : undefined,
    };

    const userRoles = await this.userRoleRepository.getAll(parsedSchema);

    const totalRegisters =
      await this.userRoleRepository.countAvailableRegisters();
    if (!totalRegisters) {
      throw CustomError.notFound('No se ha encontrado el total de registros');
    }

    return { totalRegisters: totalRegisters.total, registers: userRoles };
  }
}
