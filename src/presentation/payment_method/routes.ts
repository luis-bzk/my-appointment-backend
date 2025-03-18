import { Router } from 'express';
import { PaymentMethodDataSourceImpl } from '../../infrastructure/data_sources';
import { PaymentMethodRepositoryImpl } from '../../infrastructure/repositories';
import { PaymentMethodController } from './controller';

export class PaymentMethodRoutes {
  static get getRoutes(): Router {
    const router = Router();

    const dataSource = new PaymentMethodDataSourceImpl();
    const repository = new PaymentMethodRepositoryImpl(dataSource);
    const controller = new PaymentMethodController(repository);

    // routes
    router.post('/create', controller.createPaymentMethod);
    router.put('/update/:id', controller.updatePaymentMethod);
    router.get('/get/:id', controller.getPaymentMethod);
    router.get('/get-all', controller.getAllPaymentMethods);
    router.delete('/delete/:id', controller.deletePaymentMethod);

    return router;
  }
}
