import { UserRole } from '../../entities';
import { GetUserRoleDto } from '../../dtos/user_role';
import { UserRoleRepository } from '../../../adapters/repositories';
import { CustomError } from '../../errors';

interface GetUserRoleUseCase {
  execute(getUserRoleDto: GetUserRoleDto): Promise<UserRole>;
}

export class GetUserRole implements GetUserRoleUseCase {
  private readonly userRoleRepository: UserRoleRepository;

  constructor(userRoleRepository: UserRoleRepository) {
    this.userRoleRepository = userRoleRepository;
  }

  async execute(getUserRoleDto: GetUserRoleDto): Promise<UserRole> {
    const userRole = await this.userRoleRepository.findUserRoleId(
      getUserRoleDto.id,
    );
    if (!userRole) {
      throw CustomError.badRequest(
        'No se ha encontrado el Rol x Usuario solicitado',
      );
    }

    return userRole;
  }
}
