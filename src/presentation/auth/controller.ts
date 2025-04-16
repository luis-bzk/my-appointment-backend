import { Request, Response } from 'express';

import {
  ChangePasswordDto,
  CheckTokenDto,
  ConfirmAccountDto,
  LoginUserDto,
  RecoverPasswordDto,
  SignupUserDto,
} from '../../domain/dtos/auth';
import {
  LoginUser,
  RecoverPassword,
  ChangePassword,
  CheckToken,
  ConfirmAccount,
  SignUpUser,
} from '../../domain/use_cases/auth';
import { CustomError } from '../../domain/errors';
import {
  AuthRepository,
  EmailRepository,
  SessionRepository,
} from '../../domain/repositories';
import { CreateSession } from '../../domain/use_cases/session';
import { CreateSessionDto } from '../../domain/dtos/session';
import { JwtAdapter } from '../../config';
import { VerifyAccountDto } from '../../domain/dtos/email';
import {
  RecoverPasswordEmail,
  VerifyAccountEmail,
} from '../../domain/use_cases/email';

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

export class AuthController {
  private readonly authRepository: AuthRepository;
  private readonly sessionRepository: SessionRepository;
  private readonly emailRepository: EmailRepository;
  private readonly signToken: SignToken;

  constructor(
    authRepository: AuthRepository,
    sessionRepository: SessionRepository,
    emailRepository: EmailRepository,
  ) {
    this.authRepository = authRepository;
    this.sessionRepository = sessionRepository;
    this.emailRepository = emailRepository;
    this.signToken = JwtAdapter.generateToken;
  }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Internal Server Error' });
  };

  loginUser = async (req: Request, res: Response) => {
    try {
      const ip =
        req.headers['x-forwarded-for']?.toString() ||
        req.socket.remoteAddress ||
        'unknown';
      const userAgent = req.headers['user-agent'] || 'unknown';

      const [error, loginUserDto] = LoginUserDto.create(req.body);
      if (error) return res.status(400).json({ error: error });

      const user = await new LoginUser(this.authRepository).execute(
        loginUserDto!,
      );

      const token = await this.signToken({ id: user.id }, '24h');
      if (!token) throw CustomError.internalServer('Error al generar el token');
      const [errorSession, sessionCreateDto] = CreateSessionDto.create({
        jwt: token,
        id_user: user.id,
        expire_date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        ip: ip,
        user_agent: userAgent,
      });
      if (errorSession) return res.status(400).json({ error: errorSession });
      const session = await new CreateSession(this.sessionRepository).execute(
        sessionCreateDto!,
      );

      return res.status(200).json({ user, session });
    } catch (err) {
      this.handleError(err, res);
    }
  };

  signupUser = async (req: Request, res: Response) => {
    try {
      const [error, signupUserDto] = SignupUserDto.create(req.body);
      if (error) return res.status(400).json({ error: error });
      const data = await new SignUpUser(this.authRepository).execute(
        signupUserDto!,
      );

      const [errorEmail, verifyAccountDto] = VerifyAccountDto.create({
        email: data.email,
        name: data.name,
        last_name: data.last_name,
        token: data.token,
      });
      if (errorEmail) return res.status(400).json({ error: errorEmail });
      await new VerifyAccountEmail(this.emailRepository).execute(
        verifyAccountDto!,
      );

      return res.status(201).json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  };

  recoverPassword = async (req: Request, res: Response) => {
    try {
      const [error, recoverPasswordDto] = RecoverPasswordDto.create(req.body);
      if (error) return res.status(400).json({ error: error });
      const data = await new RecoverPassword(this.authRepository).execute(
        recoverPasswordDto!,
      );

      const [errorEmail, verifyAccountDto] = VerifyAccountDto.create({
        email: data.email,
        name: data.last_name,
        last_name: data.last_name,
        token: data.token,
      });
      if (errorEmail) return res.status(400).json({ error: errorEmail });
      await new RecoverPasswordEmail(this.emailRepository).execute(
        verifyAccountDto!,
      );

      return res
        .status(200)
        .json({
          message:
            'Si el correo electrónico está registrado, te enviaremos un mensaje para recuperar tu cuenta',
        });
    } catch (err) {
      this.handleError(err, res);
    }
  };

  changePassword = async (req: Request, res: Response) => {
    try {
      const [error, changePasswordDto] = ChangePasswordDto.create(req.body);
      if (error) return res.status(400).json({ error });

      const data = await new ChangePassword(this.authRepository).execute(
        changePasswordDto!,
      );
      return res.status(200).json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  };

  checkToken = async (req: Request, res: Response) => {
    try {
      const [error, checkTokenDto] = CheckTokenDto.create(req.params.token);
      if (error) return res.status(400).json({ error });

      const data = await new CheckToken(this.authRepository).execute(
        checkTokenDto!,
      );

      return res.status(200).json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  };

  confirmAccount = async (req: Request, res: Response) => {
    try {
      const [error, confirmAccountDto] = ConfirmAccountDto.create(req.body);
      if (error) return res.status(400).json({ error });

      const data = await new ConfirmAccount(this.authRepository).execute(
        confirmAccountDto!,
      );
      return res.status(200).json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  };
}
