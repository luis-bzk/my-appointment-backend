import { Request, Response } from 'express';

import {
  GoogleAuth,
  GoogleAuthCallbackUseCase,
} from '../../domain/use_cases/auth';
import { CustomError } from '../../domain/errors';
import { AuthRepository, SessionRepository } from '../../ports/repositories';
import { getGoogleUser, oAuth2Client } from '../../domain/external';
import { CreateSessionUseCase } from '../../domain/use_cases/session';

export class AuthGoogleController {
  private readonly authRepository: AuthRepository;
  private readonly sessionRepository: SessionRepository;

  constructor(
    authRepository: AuthRepository,
    sessionRepository: SessionRepository,
  ) {
    this.authRepository = authRepository;
    this.sessionRepository = sessionRepository;
  }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Internal Server Error' });
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
      const { email, name, given_name, picture, id } = res_google;

      const user = await new GoogleAuthCallbackUseCase(
        this.authRepository,
      ).execute({ email, name, given_name, picture, id });

      const session = await new CreateSessionUseCase(
        this.sessionRepository,
      ).execute({
        id_user: user.id,
        expire_date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        ip: 'google sign in',
        user_agent: 'google sign in',
      });

      return res.redirect(
        `${process.env.FRONTEND_URL}/auth/google-callback?token=${session.jwt}`,
      );
    } catch (err) {
      this.handleError(err, res);
    }
  };
}
