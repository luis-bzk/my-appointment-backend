import { CustomError } from '../../errors';
import { JwtAdapter } from '../../../config';
import { LoginUserDto } from '../../dtos/auth';
import { AuthRepository } from '../../repositories';

interface UserToken {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
    last_name: string;
  };
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

interface LoginUserUseCase {
  execute(loginUserDto: LoginUserDto): Promise<UserToken>;
}

export class LoginUser implements LoginUserUseCase {
  private readonly authRepository: AuthRepository;
  private readonly signToken: SignToken;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
    this.signToken = JwtAdapter.generateToken;
  }

  async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
    const user = await this.authRepository.login(loginUserDto);

    //   token
    const token = await this.signToken({ id: user.id }, '2h');
    if (!token) throw CustomError.internalServer('Error al generar el token');

    return {
      token: token,
      user: {
        id: user.id,
        name: user.name,
        last_name: user.last_name,
        email: user.email,
      },
    };
  }
}
