import { Router, Request, Response, NextFunction } from 'express';

import { AuthRoutes } from './auth/routes';
import { CityRoutes } from './city/routes';
import { UserRoutes } from './user/routes';
import { RoleRoutes } from './role/routes';
import { GenreRoutes } from './genre/routes';
import { CountryRoutes } from './country/routes';
import { ProvinceRoutes } from './province/routes';
import { UserRoleRoutes } from './user_role/routes';
import { PhoneTypeRoutes } from './phone_type/routes';
import { PaymentMethodRoutes } from './payment_method/routes';
import { NotificationTypeRoutes } from './notification_type/routes';
import { IdentificationTypeRoutes } from './identification_type/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // global routes
    router.use('/api/v1/auth', AuthRoutes.getRoutes);
    router.use('/api/v1/country', CountryRoutes.getRoutes);
    router.use('/api/v1/province', ProvinceRoutes.getRoutes);
    router.use('/api/v1/city', CityRoutes.getRoutes);
    router.use('/api/v1/user', UserRoutes.getRoutes);
    router.use('/api/v1/role', RoleRoutes.getRoutes);
    router.use('/api/v1/user-role', UserRoleRoutes.getRoutes);
    router.use('/api/v1/genre', GenreRoutes.getRoutes);
    router.use(
      '/api/v1/identification-type',
      IdentificationTypeRoutes.getRoutes,
    );
    router.use('/api/v1/phone-type', PhoneTypeRoutes.getRoutes);
    router.use('/api/v1/payment-method', PaymentMethodRoutes.getRoutes);
    router.use('/api/v1/notification-type', NotificationTypeRoutes.getRoutes);

    // security not found route
    router.use((_req: Request, res: Response, _next: NextFunction) => {
      res.status(404).json({ error: 'La ruta solicitada no existe' });
    });

    return router;
  }
}
