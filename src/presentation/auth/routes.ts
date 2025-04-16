import { Router } from 'express';
import {
  AuthDataSourceImpl,
  SessionDataSourceImpl,
} from '../../infrastructure/data_sources';
import {
  AuthRepositoryImpl,
  EmailRepositoryImpl,
  SessionRepositoryImpl,
} from '../../infrastructure/repositories';
import { AuthController } from './controller';
import { EmailServiceImpl } from '../../infrastructure/services';

export class AuthRoutes {
  static get getRoutes(): Router {
    const router = Router();

    const authDataSource = new AuthDataSourceImpl();
    const sessionDataSource = new SessionDataSourceImpl();
    const emailService = new EmailServiceImpl();

    const authRepository = new AuthRepositoryImpl(authDataSource);
    const sessionRepository = new SessionRepositoryImpl(sessionDataSource);
    const emailRepository = new EmailRepositoryImpl(emailService);

    const controller = new AuthController(
      authRepository,
      sessionRepository,
      emailRepository,
    );

    //   routes
    router.post('/login', controller.loginUser);
    router.post('/signup', controller.signupUser);
    router.patch('/request/recover-password', controller.recoverPassword);
    router.patch('/request/change-password', controller.changePassword);
    router.get('/check/token/:token', controller.checkToken);
    router.patch('/confirm/user', controller.confirmAccount);

    return router;
  }
}
