import { NextFunction, Request, Response } from 'express';

import { AuthService } from '../services';
import { AuthDataSourceImpl } from '../../infrastructure/data_sources';
import { AuthRepositoryImpl } from '../../infrastructure/repositories';

export class AuthenticatorMiddleware {
  static authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const dataSource = new AuthDataSourceImpl();
    const authRepository = new AuthRepositoryImpl(dataSource);
    const service = new AuthService(authRepository);

    if (
      !req.headers.authorization ||
      !req.headers.authorization?.startsWith('Bearer')
    ) {
      return res
        .status(401)
        .json({ error: 'No se ha podido verificar la sesión' });
    }

    try {
      const JWToken = req.headers.authorization?.split(' ')[1];
      const user = await service.authenticateUser(JWToken);

      if (!user) {
        return res
          .status(401)
          .json({ error: 'No se ha podido verificar la sesión' });
      }

      req.current_user = user;

      return next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        error:
          'No se te ha autorizado el acceso, prueba a iniciar sesión otra vez',
      });
    }
  };
}
