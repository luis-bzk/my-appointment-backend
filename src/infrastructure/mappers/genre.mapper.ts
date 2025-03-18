import { GenreDB } from '../../data/interfaces';
import { Genre } from '../../domain/entities';
import { CustomError } from '../../domain/errors';

export class GenreMapper {
  static entityFromObject(obj: GenreDB): Genre {
    const {
      gen_id,
      gen_name,
      gen_description,
      gen_abbreviation,
      gen_created_date,
      gen_record_status,
    } = obj;

    if (!gen_id) {
      throw CustomError.conflict(
        'No se ha recibido el ID del genero de la Base de Datos',
      );
    }
    if (!gen_name) {
      throw CustomError.conflict(
        'No se ha recibido el nombre del genero de la Base de Datos',
      );
    }
    if (!gen_description) {
      throw CustomError.conflict(
        'No se ha recibido la descripción del genero de la Base de Datos',
      );
    }
    if (!gen_abbreviation) {
      throw CustomError.conflict(
        'No se ha recibido la abreviación del genero de la Base de datos',
      );
    }
    if (!gen_created_date) {
      throw CustomError.conflict(
        'No se ha recibido la fecha de creación del genero de la Base de datos',
      );
    }
    if (!gen_record_status) {
      throw CustomError.conflict(
        'No se ha recibido el estado de registro del genero de la Base de datos',
      );
    }

    return new Genre(
      gen_id,
      gen_name,
      gen_description,
      gen_abbreviation,
      gen_created_date,
      gen_record_status,
    );
  }

  static entitiesFromArray(objs: GenreDB[]): Genre[] {
    if (objs.length > 0) {
      return objs.map((genre) => this.entityFromObject(genre));
    }
    return [];
  }
}
