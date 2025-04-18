import { User } from '../../entities';
import { AuthRepository } from '../../../adapters/repositories';
import { RecoverPasswordDto } from '../../dtos/auth';
import { CustomError } from '../../errors';

interface RecoverPasswordUseCase {
  execute(recoverPasswordDto: RecoverPasswordDto): Promise<User>;
}

export class RecoverPassword implements RecoverPasswordUseCase {
  private readonly authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(recoverPasswordDto: RecoverPasswordDto): Promise<User> {
    const user = await this.authRepository.findUserByEmail(
      recoverPasswordDto.email,
    );
    if (!user) {
      throw CustomError.fakeSuccess(
        'Si el correo electrónico está registrado, te enviaremos un mensaje para recuperar tu cuenta',
      );
    }

    const userWithToken = await this.authRepository.generateToken(user.id);
    if (!userWithToken) {
      throw CustomError.internalServer('Error al generar el token');
    }
    return { ...userWithToken, password: '' };
  }
}
