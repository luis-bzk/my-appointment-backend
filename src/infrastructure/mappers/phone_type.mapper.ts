import { PhoneTypeDB } from '../../data/interfaces';
import { PhoneType } from '../../domain/entities';
import { CustomError } from '../../domain/errors';

export class PhoneTypeMapper {
  static entityFromObject(obj: PhoneTypeDB): PhoneType {
    const {
      pty_id,
      pty_name,
      pty_description,
      pty_created_date,
      pty_record_status,
    } = obj;

    if (!pty_id) {
      throw CustomError.conflict(
        'No se ha recibido el ID del tipo de teléfono de la Base de Datos',
      );
    }

    if (!pty_name) {
      throw CustomError.conflict(
        'No se ha recibido el nombre del tipo de teléfono de la Base de Datos',
      );
    }

    if (!pty_description) {
      throw CustomError.conflict(
        'No se ha recibido la descripción del tipo de teléfono de la Base de Datos',
      );
    }

    if (!pty_created_date) {
      throw CustomError.conflict(
        'No se ha recibido la fecha de creación del tipo de teléfono de la Base de Datos',
      );
    }

    if (!pty_record_status) {
      throw CustomError.conflict(
        'No se ha recibido el estado de registro del tipo de teléfono de la Base de Datos',
      );
    }

    return new PhoneType(
      pty_id,
      pty_name,
      pty_description,
      pty_created_date,
      pty_record_status,
    );
  }

  static entitiesFromArray(objs: PhoneTypeDB[]): PhoneType[] {
    if (objs.length > 0) {
      return objs.map((phoneType) => this.entityFromObject(phoneType));
    }
    return [];
  }
}
