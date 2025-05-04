import { UserRole } from '../../entities';
import { UserRoleRepository } from '../../../ports/repositories';
import { CustomError } from '../../errors';
import {
  UserRoleIdDto,
  UserRoleIdPortDto,
  UserRoleIdSchema,
} from '../../schemas/user_role';

export class GetUserRoleUseCase {
  private readonly userRoleRepository: UserRoleRepository;

  constructor(userRoleRepository: UserRoleRepository) {
    this.userRoleRepository = userRoleRepository;
  }

  async execute(dto: UserRoleIdPortDto): Promise<UserRole> {
    const { success, error, data: schema } = UserRoleIdSchema.safeParse(dto);

    if (!success) {
      const message = error.errors[0]?.message || 'Datos inválidos';
      throw CustomError.badRequest(message);
    }

    const parsedUserRole: UserRoleIdDto = {
      ...schema,
      id: parseInt(schema.id, 10),
    };

    const userRole = await this.userRoleRepository.findUserRoleId(
      parsedUserRole.id,
    );
    if (!userRole) {
      throw CustomError.badRequest(
        'No se ha encontrado el Rol x Usuario solicitado',
      );
    }

    return userRole;
  }
}
