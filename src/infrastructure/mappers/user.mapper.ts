import { User } from '../../domain/entities';
import { UserDB } from '../../data/interfaces';

export class UserMapper {
  static entityFromObject(obj: UserDB | null): User | null {
    if (!obj) return null;

    return new User(
      obj.use_id,
      obj.use_name,
      obj.use_last_name,
      obj.use_email,
      obj.use_password,
      obj.use_token,
      obj.use_created_date,
      obj.use_record_status,
    );
  }

  static entitiesFromArray(objs: (UserDB | null)[]): User[] {
    return objs
      .filter((obj): obj is UserDB => obj !== null)
      .map((user) => this.entityFromObject(user)!);
  }
}
