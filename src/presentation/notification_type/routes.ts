import { Router } from 'express';
import { NotificationTypeDataSourceImpl } from '../../infrastructure/data_sources';
import { NotificationTypeRepositoryImpl } from '../../infrastructure/repositories';
import { NotificationTypeController } from './controller';

export class NotificationTypeRoutes {
  static get getRoutes(): Router {
    const router = Router();

    const dataSource = new NotificationTypeDataSourceImpl();
    const repository = new NotificationTypeRepositoryImpl(dataSource);
    const controller = new NotificationTypeController(repository);

    // routes
    router.post('/create', controller.createNotificationType);
    router.put('/update/:id', controller.updateNotificationType);
    router.get('/get/:id', controller.getNotificationType);
    router.get('/get-all', controller.getAllNotificationTypes);
    router.delete('/delete/:id', controller.deleteNotificationTypes);

    return router;
  }
}
