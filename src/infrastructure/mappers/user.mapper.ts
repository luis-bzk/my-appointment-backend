import { User } from '../../domain/entities';
import { UserDB } from '../../data/interfaces';

interface IOptions {
  includePassword?: boolean;
}
export class UserMapper {
  static entityFromObject(obj: UserDB | null, options?: IOptions): User | null {
    if (!obj) return null;

    const password = options?.includePassword ? obj.use_password : '';

    return new User(
      obj.use_id,
      obj.use_name,
      obj.use_last_name,
      obj.use_email,
      password,
      obj.use_token,
      obj.use_created_date,
      obj.use_record_status,
    );
  }

  static entitiesFromArray(objs: UserDB[]): User[] {
    return objs
      .filter((obj): obj is UserDB => obj !== null)
      .map((user) => this.entityFromObject(user)!);
  }
}
