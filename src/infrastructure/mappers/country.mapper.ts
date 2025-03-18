import { CountryDB } from '../../data/interfaces';
import { Country } from '../../domain/entities';
import { CustomError } from '../../domain/errors';

export class CountryMapper {
  static entityFromObject(obj: CountryDB): Country {
    const {
      cou_id,
      cou_name,
      cou_code,
      cou_prefix,
      cou_created_date,
      cou_record_status,
    } = obj;

    if (!cou_id) {
      throw CustomError.conflict(
        'No se ha recibido el ID del país de la Base de Datos',
      );
    }
    if (!cou_name) {
      throw CustomError.conflict(
        'No se ha recibido el nombre del país de la Base de Datos',
      );
    }
    if (!cou_code) {
      throw CustomError.conflict(
        'No se ha recibido el código del país de la Base de Datos',
      );
    }
    if (!cou_prefix) {
      throw CustomError.conflict(
        'No se ha recibido el prefijo del país de la Base de Datos',
      );
    }
    if (!cou_created_date) {
      throw CustomError.conflict(
        'No se ha recibido la fecha de creación del país de la Base de Datos',
      );
    }
    if (!cou_record_status) {
      throw CustomError.conflict(
        'No se ha recibido el estado de registro del país de la Base de Datos',
      );
    }

    return new Country(
      cou_id,
      cou_name,
      cou_code,
      cou_prefix,
      cou_created_date,
      cou_record_status,
    );
  }

  static entitiesFromArray(objs: CountryDB[]): Country[] {
    if (objs.length > 0) {
      return objs.map((country) => this.entityFromObject(country));
    } else {
      return [];
    }
  }
}
