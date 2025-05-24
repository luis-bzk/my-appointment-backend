import { Router } from 'express';

import { ProvinceController } from './controller';
import {
  CountryDataSourceImpl,
  ProvinceDataSourceImpl,
} from '../../infrastructure/data_sources';
import {
  CountryRepositoryImpl,
  ProvinceRepositoryImpl,
} from '../../infrastructure/repositories';

export class ProvinceRoutes {
  static get getRoutes(): Router {
    const router = Router();

    const provinceDataSource = new ProvinceDataSourceImpl();
    const countryDataSource = new CountryDataSourceImpl();

    const provinceRepository = new ProvinceRepositoryImpl(provinceDataSource);
    const countryRepository = new CountryRepositoryImpl(countryDataSource);

    const controller = new ProvinceController(
      provinceRepository,
      countryRepository,
    );

    // routes
    router.post('/create', controller.createProvince);
    router.put('/update/:id', controller.updateProvince);
    router.get('/get/:id', controller.getProvince);
    router.get('/get-all', controller.getAllProvinces);
    router.delete('/delete/:id', controller.deleteProvince);

    return router;
  }
}
