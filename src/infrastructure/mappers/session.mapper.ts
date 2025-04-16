import { SessionDB } from '../../data/interfaces';
import { Session } from '../../domain/entities';

export class SessionMapper {
  static entityFromObject(obj: SessionDB | null): Session | null {
    if (!obj) return null;

    return new Session(
      obj.ses_id,
      obj.ses_jwt,
      obj.id_user,
      obj.ses_created_date,
      obj.ses_expires_at,
      obj.ses_ip,
      obj.ses_user_agent,
    );
  }

  static entitiesFromArray(objs: (SessionDB | null)[]): Session[] {
    return objs
      .filter((obj): obj is SessionDB => obj !== null)
      .map((user) => this.entityFromObject(user)!);
  }
}
