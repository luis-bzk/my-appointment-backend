import { CustomError } from '../../domain/errors';
import {
  IdentificationType,
  IdentificationTypeDetail,
} from '../../domain/entities';
import {
  IdentificationTypeDB,
  IdentificationTypeDetailDB,
} from '../../data/interfaces';

export class IdentificationTypeMapper {
  static entityFromObject(obj: IdentificationTypeDB): IdentificationType {
    const {
      ity_id,
      ity_name,
      ity_description,
      ity_abbreviation,
      ity_created_date,
      ity_record_status,
      id_country,
    } = obj;

    if (!ity_id) {
      throw CustomError.conflict(
        'No se ha recibido el ID del tipo de identificación de la Base de Datos',
      );
    }

    if (!ity_name) {
      throw CustomError.conflict(
        'No se ha recibido el nombre del tipo de identificación de la Base de Datos',
      );
    }

    if (!ity_description) {
      throw CustomError.conflict(
        'No se ha recibido la descripción del tipo de identificación de la Base de datos',
      );
    }

    if (!ity_abbreviation) {
      throw CustomError.conflict(
        'No se ha recibido la abreviatura del tipo de identificación de la Base de datos',
      );
    }

    if (!ity_created_date) {
      throw CustomError.conflict(
        'No se ha recibido la fecha de creación del tipo de identificación de la Base de datos',
      );
    }

    if (!ity_record_status) {
      throw CustomError.conflict(
        'No se ha recibido el estado del tipo de identificación de la Base de datos',
      );
    }

    if (!id_country) {
      throw CustomError.conflict(
        'No se ha recibido el ID del país del tipo de identificación de la Base de datos',
      );
    }

    return new IdentificationType(
      ity_id,
      ity_name,
      ity_description,
      ity_abbreviation,
      ity_created_date,
      ity_record_status,
      id_country,
    );
  }

  static entitiesFromArray(objs: IdentificationTypeDB[]): IdentificationType[] {
    if (objs.length > 0) {
      return objs.map((obj) => this.entityFromObject(obj));
    }
    return [];
  }

  static entityFromObjectDetail(
    obj: IdentificationTypeDetailDB,
  ): IdentificationTypeDetail {
    const {
      ity_id,
      ity_name,
      ity_description,
      ity_abbreviation,
      ity_created_date,
      ity_record_status,
      id_country,
      cou_id,
      cou_name,
      cou_code,
      cou_prefix,
      cou_created_date,
      cou_record_status,
    } = obj;

    if (!ity_id) {
      throw CustomError.conflict(
        'No se ha recibido el ID del tipo de identificación de la Base de Datos',
      );
    }

    if (!ity_name) {
      throw CustomError.conflict(
        'No se ha recibido el nombre del tipo de identificación de la Base de Datos',
      );
    }

    if (!ity_description) {
      throw CustomError.conflict(
        'No se ha recibido la descripción del tipo de identificación de la Base de datos',
      );
    }

    if (!ity_abbreviation) {
      throw CustomError.conflict(
        'No se ha recibido la abreviatura del tipo de identificación de la Base de datos',
      );
    }

    if (!ity_created_date) {
      throw CustomError.conflict(
        'No se ha recibido la fecha de creación del tipo de identificación de la Base de datos',
      );
    }

    if (!ity_record_status) {
      throw CustomError.conflict(
        'No se ha recibido el estado del tipo de identificación de la Base de datos',
      );
    }

    if (!id_country) {
      throw CustomError.conflict(
        'No se ha recibido el ID del país del tipo de identificación de la Base de datos',
      );
    }

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

    return new IdentificationTypeDetail(
      ity_id,
      ity_name,
      ity_description,
      ity_abbreviation,
      ity_created_date,
      ity_record_status,
      id_country,
      {
        id: cou_id,
        name: cou_name,
        code: cou_code,
        prefix: cou_prefix,
        created_date: cou_created_date,
        record_status: cou_record_status,
      },
    );
  }

  static entitiesFromArrayDetail(
    objs: IdentificationTypeDetailDB[],
  ): IdentificationTypeDetail[] {
    if (objs.length > 0) {
      return objs.map((identification) =>
        this.entityFromObjectDetail(identification),
      );
    } else {
      return [];
    }
  }
}
