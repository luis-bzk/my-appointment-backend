import { CustomError } from '../../errors';
import { JwtAdapter } from '../../../config';
import { LoginUserDto } from '../../dtos/auth';
import { AuthRepository, SessionRepository } from '../../repositories';
import { Session } from '../../entities';
import { CreateSessionDto } from '../../dtos/session';

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

interface LoginUserUseCase {
  execute(loginUserDto: LoginUserDto): Promise<Session>;
}

export class LoginUser implements LoginUserUseCase {
  private readonly authRepository: AuthRepository;
  private readonly sessionRepository: SessionRepository;
  private readonly signToken: SignToken;

  constructor(
    authRepository: AuthRepository,
    sessionRepository: SessionRepository,
  ) {
    this.authRepository = authRepository;
    this.sessionRepository = sessionRepository;
    this.signToken = JwtAdapter.generateToken;
  }

  async execute(loginUserDto: LoginUserDto): Promise<Session> {
    const user = await this.authRepository.login(loginUserDto);

    //   token
    const token = await this.signToken({ id: user.id }, '24h');
    if (!token) throw CustomError.internalServer('Error al generar el token');

    const [errorSession, sessionCreateDto] = CreateSessionDto.create({
      jwt: token,
      id_user: user.id,
      expire_date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      ip: loginUserDto.ip,
      user_agent: loginUserDto.user_agent,
    });
    if (errorSession) throw CustomError.badRequest(errorSession);
    const session = await this.sessionRepository.create(sessionCreateDto!);

    return session;
  }
}
