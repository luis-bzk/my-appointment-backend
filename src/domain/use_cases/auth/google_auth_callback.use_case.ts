import { AuthRepository } from '../../repositories';
import { GoogleAuthDto } from '../../dtos/auth';
import { CustomError } from '../../errors';
import { User } from '../../entities';

interface GoogleAuthCallbackUseCase {
  execute(googleAuthDto: GoogleAuthDto): Promise<User>;
}

export class GoogleAuthCallback implements GoogleAuthCallbackUseCase {
  private readonly authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(googleAuthDto: GoogleAuthDto) {
    const user = await this.authRepository.findUserByEmail(googleAuthDto.email);
    if (user) {
      return { ...user, password: '' };
    }

    const createdUser =
      await this.authRepository.createGoogleUser(googleAuthDto);
    if (!createdUser) {
      throw CustomError.internalServer('Error al crear el usuario con google');
    }
    return { ...createdUser, password: '' };
  }
}
