import { Router } from 'express';

import { CityController } from './controller';
import {
  CityDataSourceImpl,
  CountryDataSourceImpl,
  ProvinceDataSourceImpl,
} from '../../infrastructure/data_sources';
import {
  CityRepositoryImpl,
  CountryRepositoryImpl,
  ProvinceRepositoryImpl,
} from '../../infrastructure/repositories';

export class CityRoutes {
  static get getRoutes(): Router {
    const router = Router();

    const cityDataSource = new CityDataSourceImpl();
    const provinceDataSource = new ProvinceDataSourceImpl();
    const countryDataSource = new CountryDataSourceImpl();

    const cityRepository = new CityRepositoryImpl(cityDataSource);
    const provinceRepository = new ProvinceRepositoryImpl(provinceDataSource);
    const countryRepository = new CountryRepositoryImpl(countryDataSource);

    const controller = new CityController(
      cityRepository,
      provinceRepository,
      countryRepository,
    );

    // routes
    router.post('/create', controller.createCity);
    router.put('/update/:id', controller.updateCity);
    router.get('/get/:id', controller.getCity);
    router.get('/get-all', controller.getAllCities);
    router.delete('/delete/:id', controller.deleteCity);

    return router;
  }
}
