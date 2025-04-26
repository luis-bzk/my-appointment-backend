import { UserRole } from '../../entities';
import { UserRoleRepository } from '../../../adapters/repositories';
import { CustomError } from '../../errors';
import {
  UserRoleIdDto,
  UserRoleIdPortDto,
  UserRoleIdSchema,
} from '../../schemas/user_role';

export class DeleteUserRoleUseCase {
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
      throw CustomError.notFound(
        'No se ha encontrado el usuario por rol deseado',
      );
    }

    const deletedUserRole = await this.userRoleRepository.delete(
      parsedUserRole.id,
    );
    if (!deletedUserRole) {
      throw CustomError.internalServer(
        'No se ha podido eliminar el Rol x Usuario solicitado',
      );
    }
    return deletedUserRole;
  }
}
