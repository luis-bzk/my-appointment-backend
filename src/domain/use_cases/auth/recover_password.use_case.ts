import { User } from '../../entities';
import { AuthRepository } from '../../../adapters/repositories';
import { CustomError } from '../../errors';
import { RecoverPasswordDto, RecoverPasswordSchema } from '../../schemas/auth';

export class RecoverPasswordUseCase {
  private readonly authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(object: RecoverPasswordDto): Promise<User> {
    const {
      success,
      error,
      data: schema,
    } = RecoverPasswordSchema.safeParse(object);
    if (!success) {
      const message = error.errors[0]?.message || 'Datos inválidos';
      throw CustomError.badRequest(message);
    }

    const user = await this.authRepository.findUserByEmail(schema.email);
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
