import { Router } from 'express';

import { RoleController } from './controller';
import { RoleDataSourceImpl } from '../../infrastructure/data_sources';
import { RoleRepositoryImpl } from '../../infrastructure/repositories';

export class RoleRoutes {
  static get getRoutes(): Router {
    const router = Router();

    const dataSource = new RoleDataSourceImpl();
    const repository = new RoleRepositoryImpl(dataSource);
    const controller = new RoleController(repository);

    // routes
    router.post('/create', controller.createRole);
    router.put('/update/:id', controller.updateRole);
    router.get('/get/:id', controller.getRole);
    router.get('/get-all', controller.getAllRoles);
    router.delete('/delete/:id', controller.deleteRole);

    return router;
  }
}
