import { ProvinceDB } from '../../data/interfaces';
import { Province } from '../../domain/entities';

export class ProvinceMapper {
  static entityFromObject(obj: ProvinceDB | null): Province | null {
    if (!obj) return null;

    return new Province(
      obj.pro_id,
      obj.pro_name,
      obj.pro_code,
      obj.pro_prefix,
      obj.pro_created_date,
      obj.pro_record_status,
      obj.id_country,
    );
  }

  static entitiesFromArray(objs: ProvinceDB[]): Province[] {
    return objs
      .filter((obj): obj is ProvinceDB => obj !== null)
      .map((province) => this.entityFromObject(province)!);
  }
}
