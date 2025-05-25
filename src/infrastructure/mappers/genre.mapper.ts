import { GenreDB } from '../../data/interfaces';
import { Genre } from '../../domain/entities';

export class GenreMapper {
  static entityFromObject(obj: GenreDB | null): Genre | null {
    if (!obj) return null;

    return new Genre(
      obj.gen_id,
      obj.gen_name,
      obj.gen_description,
      obj.gen_abbreviation,
      obj.gen_created_date,
      obj.gen_record_status,
    );
  }

  static entitiesFromArray(objs: GenreDB[]): Genre[] {
    return objs
      .filter((obj): obj is GenreDB => obj !== null)
      .map((genre) => this.entityFromObject(genre)!);
  }
}
