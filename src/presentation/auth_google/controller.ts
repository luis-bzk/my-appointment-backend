import { Request, Response } from 'express';

import {
  GoogleAuth,
  GoogleAuthCallbackUseCase,
} from '../../domain/use_cases/auth';
import { AuthRepository, SessionRepository } from '../../ports/repositories';
import { getGoogleUser, oAuth2Client } from '../../domain/external';
import { CreateSessionUseCase } from '../../domain/use_cases/session';
import { BaseController } from '../BaseController';

export class AuthGoogleController extends BaseController {
  private readonly authRepository: AuthRepository;
  private readonly sessionRepository: SessionRepository;

  constructor(
    authRepository: AuthRepository,
    sessionRepository: SessionRepository,
  ) {
    super();
    this.authRepository = authRepository;
    this.sessionRepository = sessionRepository;
  }

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
