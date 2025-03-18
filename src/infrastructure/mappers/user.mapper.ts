import { User } from '../../domain/entities';
import { UserDB } from '../../data/interfaces';
import { CustomError } from '../../domain/errors';

export class UserMapper {
  static entityFromObject(obj: UserDB, sendPassword: boolean = false): User {
    const {
      use_id,
      use_name,
      use_last_name,
      use_email,
      use_token,
      use_password,
      use_created_date,
      use_record_status,
    } = obj;

    if (!use_id) {
      throw CustomError.conflict(
        'No se ha recibido el ID del usuario de la Base de Datos',
      );
    }
    if (!use_name) {
      throw CustomError.conflict(
        'No se ha recibido el nombre del usuario de la Base de Datos',
      );
    }
    if (!use_last_name) {
      throw CustomError.conflict(
        'No se ha recibido el apellido del usuario de la Base de Datos',
      );
    }
    if (!use_email) {
      throw CustomError.conflict(
        'No se ha recibido el email del usuario de la Base de Datos',
      );
    }
    if (!use_created_date) {
      throw CustomError.conflict(
        'No se ha recibido la fecha de creación del usuario de la Base de Datos',
      );
    }
    if (!use_record_status) {
      throw CustomError.conflict(
        'No se ha recibido el estado de registro del usuario de la Base de Datos',
      );
    }

    return new User(
      use_id,
      use_name,
      use_last_name,
      use_email,
      sendPassword ? use_password : '',
      use_token,
      use_created_date,
      use_record_status,
    );
  }

  static entitiesFromArray(objs: UserDB[]): User[] {
    if (objs.length > 0) {
      return objs.map((user) => this.entityFromObject(user));
    } else {
      return [];
    }
  }
}
