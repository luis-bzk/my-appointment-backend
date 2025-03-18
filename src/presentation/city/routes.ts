import { Router } from 'express';

import { CityController } from './controller';
import { CityDataSourceImpl } from '../../infrastructure/data_sources';
import { CityRepositoryImpl } from '../../infrastructure/repositories';

export class CityRoutes {
  static get getRoutes(): Router {
    const router = Router();

    const dataSource = new CityDataSourceImpl();
    const repository = new CityRepositoryImpl(dataSource);
    const controller = new CityController(repository);

    // routes
    router.post('/create', controller.createCity);
    router.put('/update/:id', controller.updateCity);
    router.get('/get/:id', controller.getCity);
    router.get('/get-all', controller.getAllCities);
    router.delete('/delete/:id', controller.deleteCity);

    return router;
  }
}
