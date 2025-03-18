import { Role } from './role.entity';
import { User } from './user.entity';

export class UserRole {
  constructor(
    public id: number,
    public created_date: Date,
    public record_status: string,
    public id_user: number,
    public id_role: number,
  ) {}
}

export class UserRoleDetail extends UserRole {
  constructor(
    public id: number,
    public created_date: Date,
    public record_status: string,
    public id_user: number,
    public id_role: number,
    public user: User,
    public role: Role,
  ) {
    super(id, created_date, record_status, id_user, id_role);
  }
}
