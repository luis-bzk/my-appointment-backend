import { Router } from 'express';
import { IdentificationTypeDataSourceImpl } from '../../infrastructure/data_sources';
import { IdentificationTypeRepositoryImpl } from '../../infrastructure/repositories';
import { IdentificationTypeController } from './controller';

export class IdentificationTypeRoutes {
  static get getRoutes(): Router {
    const router = Router();

    const dataSource = new IdentificationTypeDataSourceImpl();
    const repository = new IdentificationTypeRepositoryImpl(dataSource);
    const controller = new IdentificationTypeController(repository);

    // routes
    router.post('/create', controller.createIdentType);
    router.put('/update/:id', controller.updateIdentType);
    router.get('/get/:id', controller.getIdentType);
    router.get('/get-all', controller.getAllIdentTypes);
    router.get('/get-all/detail', controller.getAllIdentTypesDetail);
    router.delete('/delete/:id', controller.deleteIdentType);

    return router;
  }
}
