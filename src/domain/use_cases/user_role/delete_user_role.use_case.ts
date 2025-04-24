import { UserRole } from '../../entities';
import { DeleteUserRoleDto } from '../../dtos/user_role';
import { UserRoleRepository } from '../../../adapters/repositories';
import { CustomError } from '../../errors';

interface DeleteUserRoleUseCase {
  execute(deleteUserRoleDto: DeleteUserRoleDto): Promise<UserRole>;
}

export class DeleteUserRole implements DeleteUserRoleUseCase {
  private readonly userRoleRepository: UserRoleRepository;

  constructor(userRoleRepository: UserRoleRepository) {
    this.userRoleRepository = userRoleRepository;
  }

  async execute(deleteUserRoleDto: DeleteUserRoleDto): Promise<UserRole> {
    const userRole = await this.userRoleRepository.findUserRoleId(
      deleteUserRoleDto.id,
    );
    if (!userRole) {
      throw CustomError.notFound(
        'No se ha encontrado el usuario por rol deseado',
      );
    }

    const deletedUserRole = await this.userRoleRepository.delete(
      deleteUserRoleDto.id,
    );
    if (!deletedUserRole) {
      throw CustomError.internalServer(
        'No se ha podido eliminar el Rol x Usuario solicitado',
      );
    }
    return deletedUserRole;
  }
}
