import { UserRole } from '../../entities';
import { UserRoleRepository } from '../../../ports/repositories';
import { CustomError } from '../../errors';
import {
  UpdateUserRoleDto,
  UpdateUserRolePortDto,
  UpdateUserRoleSchema,
} from '../../schemas/user_role';

export class UpdateUserRoleUseCase {
  private readonly userRoleRepository: UserRoleRepository;

  constructor(userRoleRepository: UserRoleRepository) {
    this.userRoleRepository = userRoleRepository;
  }

  async execute(dto: UpdateUserRolePortDto): Promise<UserRole> {
    const {
      success,
      error,
      data: schema,
    } = UpdateUserRoleSchema.safeParse(dto);

    if (!success) {
      const message = error.errors[0]?.message || 'Datos inválidos';
      throw CustomError.badRequest(message);
    }

    const parsedSchema: UpdateUserRoleDto = {
      ...schema,
      id: parseInt(schema.id, 10),
    };

    const existsUserRole = await this.userRoleRepository.findUserRoleId(
      parsedSchema.id,
    );
    if (!existsUserRole) {
      throw CustomError.notFound(
        'No se ha encontrado el registro deseado a actualizar',
      );
    }

    const sameRegister =
      await this.userRoleRepository.findUserRoleSameRegister(parsedSchema);
    if (sameRegister) {
      throw CustomError.conflict(
        'Ya existe un registro con los datos a actualizar',
      );
    }

    const updatedUserRole =
      await this.userRoleRepository.updateUserRole(parsedSchema);
    if (!updatedUserRole) {
      throw CustomError.internalServer(
        'No se pudo actualizar el Rol x Usuario',
      );
    }
    return updatedUserRole;
  }
}
