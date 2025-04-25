import { SessionDB } from '../../data/interfaces';
import {
  CreateSessionJwtDto,
  DeleteSessionDto,
  GetSessionDto,
} from '../../domain/schemas/session';

export abstract class SessionDataSource {
  abstract getUserSessions(id_user: number): Promise<SessionDB[]>;

  abstract create(createSessionDto: CreateSessionJwtDto): Promise<SessionDB>;

  abstract getByJwt(getSessionDto: GetSessionDto): Promise<SessionDB | null>;

  abstract killSession(
    deleteSessionDto: DeleteSessionDto,
  ): Promise<SessionDB | null>;
}
