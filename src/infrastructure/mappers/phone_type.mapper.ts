import { PhoneTypeDB } from '../../data/interfaces';
import { PhoneType } from '../../domain/entities';

export class PhoneTypeMapper {
  static entityFromObject(obj: PhoneTypeDB | null): PhoneType | null {
    if (!obj) return null;

    return new PhoneType(
      obj.pty_id,
      obj.pty_name,
      obj.pty_description,
      obj.pty_created_date,
      obj.pty_record_status,
    );
  }

  static entitiesFromArray(objs: PhoneTypeDB[]): PhoneType[] {
    return objs
      .filter((obj): obj is PhoneTypeDB => obj !== null)
      .map((phone) => this.entityFromObject(phone)!);
  }
}
