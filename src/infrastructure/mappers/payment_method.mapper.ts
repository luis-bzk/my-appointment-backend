import { PaymentMethod } from '../../domain/entities';
import { PaymentMethodDB } from '../../data/interfaces';
import { CustomError } from '../../domain/errors';

export class PaymentMethodMapper {
  static entityFromObject(obj: PaymentMethodDB): PaymentMethod {
    const {
      pme_id,
      pme_name,
      pme_description,
      pme_created_date,
      pme_record_status,
    } = obj;

    if (!pme_id) {
      throw CustomError.conflict(
        'No se ha recibido el ID del método de pago de la Base de Datos',
      );
    }

    if (!pme_name) {
      throw CustomError.conflict(
        'No se ha recibido el nombre del método de pago de la Base de datos',
      );
    }

    if (!pme_description) {
      throw CustomError.conflict(
        'No se ha recibido la descripción del método de pago de la Base de datos',
      );
    }

    if (!pme_created_date) {
      throw CustomError.conflict(
        'No se ha recibido la fecha de creación del método de pago de la Base de datos',
      );
    }

    if (!pme_record_status) {
      throw CustomError.conflict(
        'No se ha recibido el estado del método de pago de la Base de datos',
      );
    }

    return new PaymentMethod(
      pme_id,
      pme_name,
      pme_description,
      pme_created_date,
      pme_record_status,
    );
  }

  static entitiesFromArray(objs: PaymentMethodDB[]): PaymentMethod[] {
    if (objs.length > 0) {
      return objs.map((obj) => this.entityFromObject(obj));
    }
    return [];
  }
}
