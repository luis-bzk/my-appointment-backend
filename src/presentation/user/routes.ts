import { Router } from 'express';

import { UserController } from './controller';
import { UserDataSourceImpl } from '../../infrastructure/data_sources';
import { UserRepositoryImpl } from '../../infrastructure/repositories';

export class UserRoutes {
  static get getRoutes(): Router {
    const router = Router();

    const dataSource = new UserDataSourceImpl();
    const repository = new UserRepositoryImpl(dataSource);
    const controller = new UserController(repository);

    // routes
    router.post('/create', controller.createUser);
    router.put('/update/:id', controller.updateUser);
    router.get('/get/:id', controller.getUser);
    router.get('/get-all', controller.getAllUsers);
    router.delete('/delete/:id', controller.deleteUser);

    return router;
  }
}
