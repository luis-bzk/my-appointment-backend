import { RoleDB } from './role.db';
import { UserDB } from './user.db';

export interface UserRoleDB {
  uro_id: number;
  uro_created_date: Date;
  uro_record_status: string;
  id_user: number;
  id_role: number;
}

export interface UserRoleDetailDB extends UserRoleDB, UserDB, RoleDB {}
