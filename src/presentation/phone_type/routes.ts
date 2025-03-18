import { Router } from 'express';
import { PhoneTypeDataSourceImpl } from '../../infrastructure/data_sources';
import { PhoneTypeRepositoryImpl } from '../../infrastructure/repositories';
import { PhoneTypeController } from './controller';

export class PhoneTypeRoutes {
  static get getRoutes(): Router {
    const router = Router();

    const dataSource = new PhoneTypeDataSourceImpl();
    const repository = new PhoneTypeRepositoryImpl(dataSource);
    const controller = new PhoneTypeController(repository);

    router.post('/create', controller.createPhoneType);
    router.put('/update/:id', controller.updatePhoneType);
    router.get('/get/:id', controller.getPhoneType);
    router.get('/get-all', controller.getAllPhoneTypes);
    router.delete('/delete/:id', controller.deletePhoneType);

    return router;
  }
}
