import { Request, Response } from 'express';

import { GoogleAuth, GoogleAuthCallback } from '../../domain/use_cases/auth';
import { CustomError } from '../../domain/errors';
import { AuthRepository, SessionRepository } from '../../domain/repositories';
import { JwtAdapter } from '../../config';
import { GoogleAuthDto } from '../../domain/dtos/auth';
import { CreateSessionDto } from '../../domain/dtos/session';
import { CreateSession } from '../../domain/use_cases/session';
import { getGoogleUser, oAuth2Client } from '../../domain/external';

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

export class AuthGoogleController {
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

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Internal Server Error' });
  };

  authGoogle = async (_req: Request, res: Response) => {
    try {
      const data = await new GoogleAuth(oAuth2Client).execute();

      return res.status(200).json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  };

  authGoogleCallback = async (req: Request, res: Response) => {
    try {
      const { code } = req.query;

      if (!code || typeof code !== 'string') {
        return res.status(400).send('Missing code');
      }

      const res_google = await getGoogleUser(code);

      const [error, googleAuthDto] = GoogleAuthDto.create(
        res_google.email,
        res_google.name,
        res_google.given_name,
        res_google.picture,
        res_google.id,
      );
      if (error) throw CustomError.badRequest(error);
      const user = await new GoogleAuthCallback(this.authRepository).execute(
        googleAuthDto!,
      );

      const token = await this.signToken({ id: user.id }, '24h');
      if (!token) throw CustomError.internalServer('Error al generar el token');

      const [errorSession, sessionCreateDto] = CreateSessionDto.create({
        jwt: token,
        id_user: user.id,
        expire_date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        ip: 'google sign in',
        user_agent: 'google sign in',
      });
      if (errorSession) return res.status(400).json({ error: errorSession });

      const session = await new CreateSession(this.sessionRepository).execute(
        sessionCreateDto!,
      );

      return res.redirect(
        `${process.env.FRONTEND_URL}/auth/google-callback?token=${session.jwt}`,
      );
    } catch (err) {
      this.handleError(err, res);
    }
  };
}
