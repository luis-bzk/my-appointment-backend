import { UserRole } from '../../entities';
import { UpdateUserRoleDto } from '../../dtos/user_role';
import { UserRoleRepository } from '../../../adapters/repositories';
import { CustomError } from '../../errors';

interface UpdateUserRoleUseCase {
  execute(updateUserRoleDto: UpdateUserRoleDto): Promise<UserRole>;
}

export class UpdateUserRole implements UpdateUserRoleUseCase {
  private readonly userRoleRepository: UserRoleRepository;

  constructor(userRoleRepository: UserRoleRepository) {
    this.userRoleRepository = userRoleRepository;
  }

  async execute(updateUserRoleDto: UpdateUserRoleDto): Promise<UserRole> {
    const existsUserRole = await this.userRoleRepository.findUserRoleId(
      updateUserRoleDto.id,
    );
    if (!existsUserRole) {
      throw CustomError.notFound(
        'No se ha encontrado el registro deseado a actualizar',
      );
    }

    const sameRegister =
      await this.userRoleRepository.findUserRoleSameRegister(updateUserRoleDto);
    if (sameRegister) {
      throw CustomError.conflict(
        'Ya existe un registro con los datos a actualizar',
      );
    }

    const updatedUserRole =
      await this.userRoleRepository.updateUserRole(updateUserRoleDto);
    if (!updatedUserRole) {
      throw CustomError.internalServer(
        'No se pudo actualizar el Rol x Usuario',
      );
    }
    return updatedUserRole;
  }
}
