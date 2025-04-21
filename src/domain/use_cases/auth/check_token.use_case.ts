import { User } from '../../entities';
import { CheckTokenDto } from '../../dtos/auth';
import { AuthRepository } from '../../../adapters/repositories';
import { CustomError } from '../../errors';

interface CheckTokenUseCase {
  execute(checkTokenDto: CheckTokenDto): Promise<User>;
}

export class CheckToken implements CheckTokenUseCase {
  private readonly authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(checkTokenDto: CheckTokenDto): Promise<User> {
    const userToken = await this.authRepository.findUserByToken(
      checkTokenDto.token,
    );
    if (!userToken) {
      throw CustomError.notFound(
        'No se ha encontrado un usuario asociado a este token',
      );
    }
    return { ...userToken, password: '' };
  }
}
