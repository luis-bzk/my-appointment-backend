import { Role } from '../../domain/entities';
import { RoleDB } from '../../data/interfaces';

export class RoleMapper {
  static entityFromObject(obj: RoleDB | null): Role | null {
    if (!obj) return null;
    return new Role(
      obj.rol_id,
      obj.rol_name,
      obj.rol_description,
      obj.rol_created_date,
      obj.rol_record_status,
    );
  }

  static entitiesFromArray(objs: RoleDB[]): Role[] {
    return objs
      .filter((obj): obj is RoleDB => obj !== null)
      .map((role) => this.entityFromObject(role)!);
  }
}
