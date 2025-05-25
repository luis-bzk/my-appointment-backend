import { Request, Response } from 'express';

import {
  LoginUserUseCase,
  RecoverPasswordUseCase,
  ChangePasswordUseCase,
  CheckTokenUseCase,
  ConfirmAccount,
  SignUpUserUseCase,
} from '../../domain/use_cases/auth';
import {
  AuthRepository,
  EmailRepository,
  SessionRepository,
} from '../../ports/repositories';
import { CreateSessionUseCase } from '../../domain/use_cases/session';
import {
  RecoverPasswordEmailUseCase,
  VerifyAccountEmailUseCase,
} from '../../domain/use_cases/email';
import { BaseController } from '../BaseController';

export class AuthController extends BaseController {
  private readonly authRepository: AuthRepository;
  private readonly sessionRepository: SessionRepository;
  private readonly emailRepository: EmailRepository;

  constructor(
    authRepository: AuthRepository,
    sessionRepository: SessionRepository,
    emailRepository: EmailRepository,
  ) {
    super();
    this.authRepository = authRepository;
    this.sessionRepository = sessionRepository;
    this.emailRepository = emailRepository;
  }

  loginUser = async (req: Request, res: Response) => {
    try {
      const ip =
        req.headers['x-forwarded-for']?.toString() ||
        req.socket.remoteAddress ||
        'unknown';
      const userAgent = req.headers['user-agent'] || 'unknown';

      const user = await new LoginUserUseCase(this.authRepository).execute(
        req.body,
      );

      const session = await new CreateSessionUseCase(
        this.sessionRepository,
      ).execute({
        id_user: user.id,
        expire_date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        ip: ip,
        user_agent: userAgent,
      });

      return res.status(200).json({ user, session });
    } catch (err) {
      this.handleError(err, res);
    }
  };

  signupUser = async (req: Request, res: Response) => {
    try {
      const data = await new SignUpUserUseCase(this.authRepository).execute(
        req.body,
      );
      const { email, name, last_name, token } = data;

      await new VerifyAccountEmailUseCase(this.emailRepository).execute({
        email,
        name,
        last_name,
        token,
      });

      return res.status(201).json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  };

  recoverPassword = async (req: Request, res: Response) => {
    try {
      const data = await new RecoverPasswordUseCase(
        this.authRepository,
      ).execute(req.body);
      const { email, name, last_name, token } = data;

      await new RecoverPasswordEmailUseCase(this.emailRepository).execute({
        email,
        name,
        last_name,
        token,
      });

      return res.status(200).json({
        message:
          'Si el correo electrónico está registrado, te enviaremos un mensaje para recuperar tu cuenta',
      });
    } catch (err) {
      this.handleError(err, res);
    }
  };

  changePassword = async (req: Request, res: Response) => {
    try {
      const data = await new ChangePasswordUseCase(this.authRepository).execute(
        req.body,
      );
      return res.status(200).json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  };

  checkToken = async (req: Request, res: Response) => {
    try {
      const data = await new CheckTokenUseCase(this.authRepository).execute({
        token: req.params.token,
      });

      return res.status(200).json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  };

  confirmAccount = async (req: Request, res: Response) => {
    try {
      const data = await new ConfirmAccount(this.authRepository).execute(
        req.body,
      );
      return res.status(200).json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  };
}
