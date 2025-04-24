import { UserRole } from '../../domain/entities';
import { UserRoleDB } from '../../data/interfaces';

export class UserRoleMapper {
  static entityFromObject(obj: UserRoleDB | null): UserRole | null {
    if (!obj) return null;

    return new UserRole(
      obj.uro_id,
      obj.uro_created_date,
      obj.uro_record_status,
      obj.id_user,
      obj.id_role,
    );
  }

  static entitiesFromArray(objs: UserRoleDB[]): UserRole[] {
    return objs
      .filter((obj): obj is UserRoleDB => obj !== null)
      .map((userRole) => this.entityFromObject(userRole)!);
  }
}
