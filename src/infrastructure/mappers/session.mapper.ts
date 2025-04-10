import { SessionDB } from '../../data/interfaces';
import { Session } from '../../domain/entities';
import { CustomError } from '../../domain/errors';

export class SessionMapper {
  static entityFromObject(obj: SessionDB): Session {
    const {
      ses_id,
      ses_jwt,
      id_user,
      ses_created_date,
      ses_expires_at,
      ses_ip,
      ses_user_agent,
    } = obj;

    if (!ses_id) {
      throw new Error(
        'No se ha recibido el ID de la sesión de la Base de Datos',
      );
    }
    if (!ses_jwt) {
      throw CustomError.conflict(
        'No se ha recibido el JWT de la sesión de la Base de Datos',
      );
    }
    if (!id_user) {
      throw CustomError.conflict(
        'No se ha recibido el ID de usuario de la sesión de la Base de Datos',
      );
    }
    if (!ses_created_date) {
      throw CustomError.conflict(
        'No se ha recibido la fecha de creación de la sesión de la Base de Datos',
      );
    }
    if (!ses_expires_at) {
      throw CustomError.conflict(
        'No se ha recibido la fecha de expiración de la sesión de la Base de Datos',
      );
    }
    if (!ses_ip) {
      throw CustomError.conflict(
        'No se ha recibido la IP de la sesión de la Base de Datos',
      );
    }
    if (!ses_user_agent) {
      throw CustomError.conflict(
        'No se ha recibido el User Agent de la sesión de la Base de Datos',
      );
    }

    return new Session(
      ses_id,
      ses_jwt,
      id_user,
      ses_created_date,
      ses_expires_at,
      ses_ip,
      ses_user_agent,
    );
  }
}
