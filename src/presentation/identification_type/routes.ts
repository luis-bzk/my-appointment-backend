import { Router } from 'express';

import { IdentificationTypeController } from './controller';
import {
  CountryDataSourceImpl,
  IdentificationTypeDataSourceImpl,
} from '../../infrastructure/data_sources';
import {
  CountryRepositoryImpl,
  IdentificationTypeRepositoryImpl,
} from '../../infrastructure/repositories';

export class IdentificationTypeRoutes {
  static get getRoutes(): Router {
    const router = Router();

    const identTypeDataSource = new IdentificationTypeDataSourceImpl();
    const countryDataSource = new CountryDataSourceImpl();

    const identTypeRepository = new IdentificationTypeRepositoryImpl(
      identTypeDataSource,
    );
    const countryRepository = new CountryRepositoryImpl(countryDataSource);

    const controller = new IdentificationTypeController(
      identTypeRepository,
      countryRepository,
    );

    // routes
    router.post('/create', controller.createIdentType);
    router.put('/update/:id', controller.updateIdentType);
    router.get('/get/:id', controller.getIdentType);
    router.get('/get-all', controller.getAllIdentTypes);
    router.delete('/delete/:id', controller.deleteIdentType);

    return router;
  }
}
