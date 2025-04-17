import { AuthRepository } from '../../../adapters/repositories';
import { GoogleAuthDto } from '../../dtos/auth';
import { CustomError } from '../../errors';
import { User } from '../../entities';
import { BcryptAdapter } from '../../../config';
import { GeneratorValues } from '../../../utils';

type HashFunction = (password: string) => string;

interface GoogleAuthCallbackUseCase {
  execute(googleAuthDto: GoogleAuthDto): Promise<User>;
}

export class GoogleAuthCallback implements GoogleAuthCallbackUseCase {
  private readonly authRepository: AuthRepository;
  private readonly hashPassword: HashFunction;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
    this.hashPassword = BcryptAdapter.hash;
  }

  async execute(googleAuthDto: GoogleAuthDto) {
    const user = await this.authRepository.findUserByEmail(googleAuthDto.email);
    if (user) {
      return { ...user, password: '' };
    }

    const generatedPassword = this.hashPassword(
      GeneratorValues.passwordGenerator(),
    );

    const createdUser = await this.authRepository.createGoogleUser(
      googleAuthDto,
      generatedPassword,
    );
    if (!createdUser) {
      throw CustomError.internalServer('Error al crear el usuario con google');
    }
    return { ...createdUser, password: '' };
  }
}
