import { Router } from 'express';

import { UserRoleController } from './controller';
import {
  RoleDataSourceImpl,
  UserDataSourceImpl,
  UserRoleDataSourceImpl,
} from '../../infrastructure/data_sources';
import {
  RoleRepositoryImpl,
  UserRepositoryImpl,
  UserRoleRepositoryImpl,
} from '../../infrastructure/repositories';

export class UserRoleRoutes {
  static get getRoutes(): Router {
    const router = Router();

    const userRoleDataSource = new UserRoleDataSourceImpl();
    const userDataSource = new UserDataSourceImpl();
    const roleDataSource = new RoleDataSourceImpl();

    const userRoleRepository = new UserRoleRepositoryImpl(userRoleDataSource);
    const userRepository = new UserRepositoryImpl(userDataSource);
    const roleRepository = new RoleRepositoryImpl(roleDataSource);

    const controller = new UserRoleController(
      userRoleRepository,
      userRepository,
      roleRepository,
    );

    // routes
    router.post('/create', controller.createUserRole);
    router.put('/update/:id', controller.updateUserRole);
    router.get('/get/:id', controller.getUserRole);
    router.get('/get-all', controller.getAllUsersRoles);
    router.get('/get-all/detail', controller.getAllUsersRoles);
    router.delete('/delete/:id', controller.deleteUserRole);

    return router;
  }
}
