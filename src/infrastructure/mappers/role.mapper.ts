import { Role } from '../../domain/entities';
import { RoleDB } from '../../data/interfaces';
import { CustomError } from '../../domain/errors';

export class RoleMapper {
  static entityFromObject(obj: RoleDB): Role {
    const {
      rol_id,
      rol_name,
      rol_description,
      rol_created_date,
      rol_record_status,
    } = obj;

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

    return new Role(
      rol_id,
      rol_name,
      rol_description,
      rol_created_date,
      rol_record_status,
    );
  }

  static entitiesFromArray(objs: RoleDB[]): Role[] {
    if (objs.length > 0) {
      return objs.map((role) => this.entityFromObject(role));
    } else {
      return [];
    }
  }
}
