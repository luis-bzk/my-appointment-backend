import { CustomError } from '../../domain/errors';
import { NotificationType } from '../../domain/entities';
import { NotificationTypeDB } from '../../data/interfaces';

export class NotificationTypeMapper {
  static entityFromObject(obj: NotificationTypeDB): NotificationType {
    const {
      nty_id,
      nty_name,
      nty_description,
      nty_created_date,
      nty_record_status,
    } = obj;

    if (!nty_id) {
      throw CustomError.conflict(
        'No se ha recibido el ID del tipo de notificación de la Base de Datos',
      );
    }

    if (!nty_name) {
      throw CustomError.conflict(
        'No se ha recibido el nombre del tipo de notificación de la Base de Datos',
      );
    }

    if (!nty_description) {
      throw CustomError.conflict(
        'No se ha recibido la descripción del tipo de notificación de la Base de Datos',
      );
    }

    if (!nty_created_date) {
      throw CustomError.conflict(
        'No se ha recibido la fecha de creación del tipo de notificación de la Base de Datos',
      );
    }

    if (!nty_record_status) {
      throw CustomError.conflict(
        'No se ha recibido el estado de registro del tipo de notificación de la Base de Datos',
      );
    }

    return new NotificationType(
      nty_id,
      nty_name,
      nty_description,
      nty_created_date,
      nty_record_status,
    );
  }

  static entitiesFromArray(objs: NotificationTypeDB[]): NotificationType[] {
    if (objs.length > 0) {
      return objs.map((obj) => this.entityFromObject(obj));
    }
    return [];
  }
}
