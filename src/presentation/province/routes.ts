import { Router } from 'express';

import { ProvinceController } from './controller';
import { ProvinceDataSourceImpl } from '../../infrastructure/data_sources';
import { ProvinceRepositoryImpl } from '../../infrastructure/repositories';

export class ProvinceRoutes {
  static get getRoutes(): Router {
    const router = Router();

    const dataSource = new ProvinceDataSourceImpl();
    const repository = new ProvinceRepositoryImpl(dataSource);
    const controller = new ProvinceController(repository);

    // routes
    router.post('/create', controller.createProvince);
    router.put('/update/:id', controller.updateProvince);
    router.get('/get/:id', controller.getProvince);
    router.get('/get-all', controller.getAllProvinces);
    router.delete('/delete/:id', controller.deleteProvince);

    return router;
  }
}
