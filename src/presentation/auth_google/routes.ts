import { Router } from 'express';
import {
  AuthDataSourceImpl,
  SessionDataSourceImpl,
} from '../../infrastructure/data_sources';
import {
  AuthRepositoryImpl,
  SessionRepositoryImpl,
} from '../../infrastructure/repositories';
import { AuthGoogleController } from './controller';

export class AuthGoogleRoutes {
  static get getRoutes(): Router {
    const router = Router();

    const authDataSource = new AuthDataSourceImpl();
    const sessionDataSource = new SessionDataSourceImpl();
    const authRepository = new AuthRepositoryImpl(authDataSource);
    const sessionRepository = new SessionRepositoryImpl(sessionDataSource);
    const controller = new AuthGoogleController(
      authRepository,
      sessionRepository,
    );

    //   routes
    router.get('/login', controller.authGoogle);
    router.get('/callback', controller.authGoogleCallback);

    return router;
  }
}
