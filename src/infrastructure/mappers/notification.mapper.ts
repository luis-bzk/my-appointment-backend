import { NotificationDB } from '../../data/interfaces';
import { Notification } from '../../domain/entities';

export class NotificationMapper {
  static entityFromObject(obj: NotificationDB): Notification {
    const {
      not_id,
      not_message,
      not_is_read,
      not_created_date,
      not_record_status,
      id_notification_type,
      id_user,
    } = obj;

    if (!not_id) {
      throw new Error(
        'No se ha recibido el id de la notificación de la Base de Datos',
      );
    }
    if (!not_message) {
      throw new Error(
        'No se ha recibido el mensaje de la notificación de la Base de Datos',
      );
    }
    if (!not_is_read) {
      throw new Error(
        'No se ha recibido el estado de lectura de la notificación de la Base de Datos',
      );
    }
    if (!not_created_date) {
      throw new Error(
        'No se ha recibido la fecha de creación de la notificación de la Base de Datos',
      );
    }
    if (!not_record_status) {
      throw new Error(
        'No se ha recibido el estado de registro de la notificación de la Base de Datos',
      );
    }
    if (!id_notification_type) {
      throw new Error(
        'No se ha recibido el id del tipo de notificación de la Base de Datos',
      );
    }
    if (!id_user) {
      throw new Error(
        'No se ha recibido el id del usuario de la notificación de la Base de Datos',
      );
    }

    return new Notification(
      not_id,
      not_message,
      not_is_read,
      not_created_date,
      not_record_status,
      id_notification_type,
      id_user,
    );
  }

  static entitiesFromObjects(objs: NotificationDB[]): Notification[] {
    if (objs.length > 0) {
      return objs.map((obj) => this.entityFromObject(obj));
    }

    return [];
  }
}
