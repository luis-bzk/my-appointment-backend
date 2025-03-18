import { UserRole, UserRoleDetail } from '../../domain/entities';
import { UserRoleDB, UserRoleDetailDB } from '../../data/interfaces';
import { CustomError } from '../../domain/errors';

export class UserRoleMapper {
  static entityFromObject(obj: UserRoleDB): UserRole {
    const { uro_id, uro_created_date, uro_record_status, id_user, id_role } =
      obj;

    if (!uro_id) {
      throw CustomError.conflict(
        'No se ha recibido el id del usuario por rol de la Base de Datos',
      );
    }
    if (!uro_created_date) {
      throw CustomError.conflict(
        'No se ha recibido la fecha de creación del usuario por rol de la Base de Datos',
      );
    }
    if (!uro_record_status) {
      throw CustomError.conflict(
        'No se ha recibido el estado de registro del usuario por rol de la Base de Datos',
      );
    }
    if (!id_user) {
      throw CustomError.conflict(
        'No se ha recibido el id del usuario del usuario por rol de la Base de Datos',
      );
    }
    if (!id_role) {
      throw CustomError.conflict(
        'No se ha recibido el id del rol del usuario por rol de la Base de Datos',
      );
    }

    return new UserRole(
      uro_id,
      uro_created_date,
      uro_record_status,
      id_user,
      id_role,
    );
  }

  static entitiesFromArray(objs: UserRoleDB[]): UserRole[] {
    if (objs.length > 0) {
      return objs.map((userRole) => this.entityFromObject(userRole));
    } else {
      return [];
    }
  }

  static entityFromObjectDetail(obj: UserRoleDetailDB): UserRoleDetail {
    const {
      uro_id,
      uro_created_date,
      uro_record_status,
      id_user,
      id_role,
      use_id,
      use_name,
      use_last_name,
      use_email,
      use_password,
      use_token,
      use_created_date,
      use_record_status,
      rol_id,
      rol_name,
      rol_description,
      rol_created_date,
      rol_record_status,
    } = obj;

    if (!uro_id) {
      throw CustomError.conflict(
        'No se ha recibido el id del usuario por rol de la Base de Datos',
      );
    }
    if (!uro_created_date) {
      throw CustomError.conflict(
        'No se ha recibido la fecha de creación del usuario por rol de la Base de Datos',
      );
    }
    if (!uro_record_status) {
      throw CustomError.conflict(
        'No se ha recibido el estado de registro del usuario por rol de la Base de Datos',
      );
    }
    if (!id_user) {
      throw CustomError.conflict(
        'No se ha recibido el id del usuario del usuario por rol de la Base de Datos',
      );
    }
    if (!id_role) {
      throw CustomError.conflict(
        'No se ha recibido el id del rol del usuario por rol de la Base de Datos',
      );
    }
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
    if (!rol_id) {
      throw CustomError.conflict(
        'No se ha recibido el ID del rol de la Base de Datos',
      );
    }
    if (!rol_name) {
      throw CustomError.conflict(
        'No se ha recibido el nombre del rol de la Base de Datos',
      );
    }
    if (!rol_description) {
      throw CustomError.conflict(
        'No se ha recibido la descripción del rol de la Base de Datos',
      );
    }
    if (!rol_created_date) {
      throw CustomError.conflict(
        'No se ha recibido la fecha de creación del rol de la Base de Datos',
      );
    }
    if (!rol_record_status) {
      throw CustomError.conflict(
        'No se ha recibido el estado de registro del rol de la Base de Datos',
      );
    }

    return new UserRoleDetail(
      uro_id,
      uro_created_date,
      uro_record_status,
      id_user,
      id_role,
      {
        id: use_id,
        name: use_name,
        last_name: use_last_name,
        email: use_email,
        password: use_password,
        token: use_token,
        created_date: use_created_date,
        record_status: use_record_status,
      },
      {
        id: rol_id,
        name: rol_name,
        description: rol_description,
        created_date: rol_created_date,
        record_status: rol_record_status,
      },
    );
  }

  static entitiesFromArrayDetail(objs: UserRoleDetailDB[]): UserRoleDetail[] {
    if (objs.length > 0) {
      return objs.map((userRole) => this.entityFromObjectDetail(userRole));
    } else {
      return [];
    }
  }
}
