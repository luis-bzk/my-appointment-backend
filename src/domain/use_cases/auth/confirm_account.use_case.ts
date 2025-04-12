import { User } from '../../entities';
import { AuthRepository } from '../../repositories';
import { ConfirmAccountDto } from '../../dtos/auth';
import { CustomError } from '../../errors';

interface ConfirmAccountUseCase {
  execute(confirmAccountDto: ConfirmAccountDto): Promise<User>;
}

export class ConfirmAccount implements ConfirmAccountUseCase {
  private readonly authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(confirmAccountDto: ConfirmAccountDto): Promise<User> {
    const userToken = await this.authRepository.findUserByToken(
      confirmAccountDto.token,
    );
    if (!userToken) {
      throw CustomError.notFound(
        'No se ha encontrado un usuario asociado a este token',
      );
    }

    const userCleanToken = await this.authRepository.cleanToken(
      confirmAccountDto.token,
    );
    if (!userCleanToken) {
      throw CustomError.internalServer('Error al confirmar la cuenta');
    }
    return { ...userCleanToken, password: '' };
  }
}
