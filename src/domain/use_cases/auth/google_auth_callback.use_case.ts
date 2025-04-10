import { OAuth2Client } from 'google-auth-library';
import { AuthRepository, SessionRepository } from '../../repositories';
import { GoogleAuthDto } from '../../dtos/auth';
import { CustomError } from '../../errors';
import { JwtAdapter } from '../../../config';
import { CreateSessionDto } from '../../dtos/session';
import { Session } from '../../entities';

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

interface GoogleAuthCallbackUseCase {
  execute(code: string): Promise<Session>;
}

export class GoogleAuthCallback implements GoogleAuthCallbackUseCase {
  private readonly authRepository: AuthRepository;
  private readonly sessionRepository: SessionRepository;

  private readonly oAuth2Client: OAuth2Client;
  private readonly signToken: SignToken;

  constructor(
    authRepository: AuthRepository,
    sessionRepository: SessionRepository,
    oAuth2Client: OAuth2Client,
  ) {
    this.authRepository = authRepository;
    this.sessionRepository = sessionRepository;
    this.oAuth2Client = oAuth2Client;
    this.signToken = JwtAdapter.generateToken;
  }

  async execute(code: string) {
    const { tokens } = await this.oAuth2Client.getToken(code);
    this.oAuth2Client.setCredentials(tokens);

    const res: {
      data: { email: string; name: string; picture: string; id: string };
    } = await this.oAuth2Client.request({
      url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    });

    console.log({ res });
    console.log({ 'res.data': res.data });

    const [error, googleAuthDto] = GoogleAuthDto.create(
      res.data.email,
      res.data.name,
      res.data.picture,
      res.data.id,
    );
    if (error) throw CustomError.badRequest(error);
    const user = await this.authRepository.googleAuth(googleAuthDto!);

    //   token
    const token = await this.signToken({ id: user.id }, '24h');
    if (!token) throw CustomError.internalServer('Error al generar el token');

    const [errorSession, sessionCreateDto] = CreateSessionDto.create({
      jwt: token,
      id_user: user.id,
      expire_date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      ip: 'google sign in',
      user_agent: 'google sign in',
    });
    if (errorSession) throw CustomError.badRequest(errorSession);
    const session = await this.sessionRepository.create(sessionCreateDto!);

    return session;
  }
}
