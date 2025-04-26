import { UserRole } from '../../entities';
import { UserRoleRepository } from '../../../adapters/repositories';
import { CustomError } from '../../errors';
import {
  CreateUserRoleDto,
  CreateUserRoleSchema,
} from '../../schemas/user_role';

export class CreateUserRoleUseCase {
  private readonly userRoleRepository: UserRoleRepository;

  constructor(userRoleRepository: UserRoleRepository) {
    this.userRoleRepository = userRoleRepository;
  }

  async execute(dto: CreateUserRoleDto): Promise<UserRole> {
    const {
      success,
      error,
      data: schema,
    } = CreateUserRoleSchema.safeParse(dto);
    if (!success) {
      const message = error.errors[0]?.message || 'Datos inválidos';
      throw CustomError.badRequest(message);
    }

    const userRoleExisting = await this.userRoleRepository.findUserRole(schema);
    if (userRoleExisting) {
      throw CustomError.conflict('El usuario ya tiene asignado el rol deseado');
    }

    const createdUserRole =
      await this.userRoleRepository.createUserRole(schema);
    if (!createdUserRole) {
      throw CustomError.internalServer('No se pudo crear el Rol x Usuario');
    }
    return createdUserRole;
  }
}
