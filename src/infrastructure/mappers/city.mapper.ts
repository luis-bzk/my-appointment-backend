import { CityDB } from '../../data/interfaces';
import { City } from '../../domain/entities';

export class CityMapper {
  static entityFromObject(obj: CityDB | null): City | null {
    if (!obj) return null;

    return new City(
      obj.cit_id,
      obj.cit_name,
      obj.cit_created_date,
      obj.cit_record_status,
      obj.id_country,
      obj.id_province,
    );
  }

  static entitiesFromArray(objs: CityDB[]): City[] {
    return objs
      .filter((obj): obj is CityDB => obj !== null)
      .map((city) => this.entityFromObject(city)!);
  }
}
