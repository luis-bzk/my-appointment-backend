import { LoginUserDto } from '../../dtos/auth';
import { AuthRepository } from '../../../adapters/repositories';
import { User } from '../../entities';
import { CustomError } from '../../errors';
import { BcryptAdapter } from '../../../config';

interface LoginUserUseCase {
  execute(loginUserDto: LoginUserDto): Promise<User>;
}

type CompareFunction = (password: string, hashed: string) => boolean;

export class LoginUser implements LoginUserUseCase {
  private readonly authRepository: AuthRepository;
  private readonly comparePassword: CompareFunction;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
    this.comparePassword = BcryptAdapter.compare;
  }

  async execute(loginUserDto: LoginUserDto): Promise<User> {
    const user = await this.authRepository.findUserByEmail(loginUserDto.email);
    if (!user) {
      throw CustomError.badRequest('El usuario o contraseña es incorrecto');
    }
    if (user.token) {
      throw CustomError.forbidden('El usuario no se encuentra verificado');
    }

    const isMatching = this.comparePassword(
      loginUserDto.password,
      user.password,
    );
    if (!isMatching) {
      throw CustomError.badRequest('El usuario o contraseña es incorrecto');
    }

    return { ...user, password: '' };
  }
}
