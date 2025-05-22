import { CountryDB } from '../../data/interfaces';
import { Country } from '../../domain/entities';

export class CountryMapper {
  static entityFromObject(obj: CountryDB | null): Country | null {
    if (!obj) return null;

    return new Country(
      obj.cou_id,
      obj.cou_name,
      obj.cou_code,
      obj.cou_prefix,
      obj.cou_created_date,
      obj.cou_record_status,
    );
  }

  static entitiesFromArray(objs: CountryDB[]): Country[] {
    return objs
      .filter((obj): obj is CountryDB => obj !== null)
      .map((country) => this.entityFromObject(country)!);
  }
}
