import { Router } from 'express';
import { AuthDataSourceImpl } from '../../infrastructure/data_sources';
import { AuthRepositoryImpl } from '../../infrastructure/repositories';
import { AuthController } from './controller';

export class AuthRoutes {
  static get getRoutes(): Router {
    const router = Router();

    const dataSource = new AuthDataSourceImpl();
    const authRepository = new AuthRepositoryImpl(dataSource);
    const controller = new AuthController(authRepository);

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
