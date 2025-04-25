import { User } from '../../entities';
import { AuthRepository } from '../../../adapters/repositories';
import { CustomError } from '../../errors';
import { CheckTokenDto, CheckTokenSchema } from '../../schemas/auth';

export class CheckTokenUseCase {
  private readonly authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(params: CheckTokenDto): Promise<User> {
    const { success, error, data: schema } = CheckTokenSchema.safeParse(params);
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
    return { ...userToken, password: '' };
  }
}
