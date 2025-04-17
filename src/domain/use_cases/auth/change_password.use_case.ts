import { User } from '../../entities';
import { ChangePasswordDto } from '../../dtos/auth';
import { AuthRepository } from '../../../adapters/repositories';
import { CustomError } from '../../errors';
import { BcryptAdapter } from '../../../config';

type HashFunction = (password: string) => string;

interface ChangePasswordUseCase {
  execute(changePasswordDto: ChangePasswordDto): Promise<User>;
}

export class ChangePassword implements ChangePasswordUseCase {
  private readonly authRepository: AuthRepository;
  private readonly hashPassword: HashFunction;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
    this.hashPassword = BcryptAdapter.hash;
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
    const hashedPassword = this.hashPassword(changePasswordDto.password);
    const updatedDto: ChangePasswordDto = new ChangePasswordDto(
      hashedPassword,
      changePasswordDto.token,
    );

    const userUpdated = await this.authRepository.changePassword(updatedDto);
    if (!userUpdated) {
      throw CustomError.internalServer(
        'No se ha podido actualizar la contraseña del usuario',
      );
    }
    return { ...userUpdated, password: '' };
  }
}
