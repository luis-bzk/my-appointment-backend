import { UserRole } from '../../entities';
import { UserRoleRepository } from '../../../ports/repositories';
import {
  GetAllUserRolesSchema,
  GetAllUsersRolesDto,
  GetAllUsersRolesPortDto,
} from '../../schemas/user_role';
import { CustomError } from '../../errors';

export class GetAllUsersRolesDetailUseCase {
  private readonly userRoleRepository: UserRoleRepository;

  constructor(userRoleRepository: UserRoleRepository) {
    this.userRoleRepository = userRoleRepository;
  }

  async execute(dto: GetAllUsersRolesPortDto): Promise<UserRole[]> {
    const {
      success,
      error,
      data: schema,
    } = GetAllUserRolesSchema.safeParse(dto);

    if (!success) {
      const message = error.errors[0]?.message || 'Parámetros inválidos';
      throw CustomError.badRequest(message);
    }

    const parsedSchema: GetAllUsersRolesDto = {
      ...schema,
      limit: parseInt(schema.limit ?? '', 10),
      offset: parseInt(schema.offset ?? '', 10),
    };

    return this.userRoleRepository.getAll(parsedSchema);
  }
}
