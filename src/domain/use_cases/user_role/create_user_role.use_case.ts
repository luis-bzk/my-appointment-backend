import { UserRole } from '../../entities';
import { CreateUserRoleDto } from '../../dtos/user_role';
import { UserRoleRepository } from '../../../adapters/repositories';
import { CustomError } from '../../errors';

interface CreateUserRoleUseCase {
  execute(createUserRoleDto: CreateUserRoleDto): Promise<UserRole>;
}

export class CreateUserRole implements CreateUserRoleUseCase {
  private readonly userRoleRepository: UserRoleRepository;

  constructor(userRoleRepository: UserRoleRepository) {
    this.userRoleRepository = userRoleRepository;
  }

  async execute(createUserRoleDto: CreateUserRoleDto): Promise<UserRole> {
    const userRoleExisting =
      await this.userRoleRepository.findUserRole(createUserRoleDto);
    if (userRoleExisting) {
      throw CustomError.conflict('El usuario ya tiene asignado el rol deseado');
    }

    const createdUserRole =
      await this.userRoleRepository.createUserRole(createUserRoleDto);
    if (!createdUserRole) {
      throw CustomError.internalServer('No se pudo crear el Rol x Usuario');
    }
    return createdUserRole;
  }
}
