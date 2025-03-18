import { Router } from 'express';

import { UserRoleController } from './controller';
import { UserRoleDataSourceImpl } from '../../infrastructure/data_sources';
import { UserRoleRepositoryImpl } from '../../infrastructure/repositories';

export class UserRoleRoutes {
  static get getRoutes(): Router {
    const router = Router();

    const dataSource = new UserRoleDataSourceImpl();
    const repository = new UserRoleRepositoryImpl(dataSource);
    const controller = new UserRoleController(repository);

    // routes
    router.post('/create', controller.createUserRole);
    router.put('/update/:id', controller.updateUserRole);
    router.get('/get/:id', controller.getUserRole);
    router.get('/get-all', controller.getAllUsersRoles);
    router.get('/get-all/detail', controller.getAllUsersRolesDetail);
    router.delete('/delete/:id', controller.deleteUserRole);

    return router;
  }
}
