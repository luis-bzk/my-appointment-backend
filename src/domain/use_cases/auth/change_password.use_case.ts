import { User } from '../../entities';
import { ChangePasswordDto } from '../../dtos/auth';
import { AuthRepository } from '../../repositories';
import { CustomError } from '../../errors';

interface ChangePasswordUseCase {
  execute(changePasswordDto: ChangePasswordDto): Promise<User>;
}

export class ChangePassword implements ChangePasswordUseCase {
  private readonly authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(changePasswordDto: ChangePasswordDto): Promise<User> {
    const userToken = await this.authRepository.findUserByToken(
      changePasswordDto.token,
    );
    if (!userToken) {
      throw CustomError.notFound(
        'No se ha encontrado un usuario asociado a este token',
      );
    }

    const userUpdated =
      await this.authRepository.changePassword(changePasswordDto);
    if (!userUpdated) {
      throw CustomError.internalServer(
        'No se ha podido actualizar la contraseña del usuario',
      );
    }
    return { ...userUpdated, password: '' };
  }
}
