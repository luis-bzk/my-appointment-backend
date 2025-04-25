import { User } from '../../entities';
import { AuthRepository } from '../../../adapters/repositories';
import { CustomError } from '../../errors';
import { ConfirmAccountDto, ConfirmAccountSchema } from '../../schemas/auth';

export class ConfirmAccount {
  private readonly authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(object: ConfirmAccountDto): Promise<User> {
    const {
      success,
      error,
      data: schema,
    } = ConfirmAccountSchema.safeParse(object);
    if (!success) {
      const message = error.errors[0]?.message || 'Datos inválidos';
      throw CustomError.badRequest(message);
    }

    const userToken = await this.authRepository.findUserByToken(schema.token);
    if (!userToken) {
      throw CustomError.notFound(
        'No se ha encontrado un usuario asociado a este token',
      );
    }

    const userCleanToken = await this.authRepository.cleanToken(schema.token);
    if (!userCleanToken) {
      throw CustomError.internalServer('Error al confirmar la cuenta');
    }
    return { ...userCleanToken, password: '' };
  }
}
