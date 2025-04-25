import { Session } from '../../domain/entities';
import {
  CreateSessionJwtDto,
  DeleteSessionDto,
  GetSessionDto,
} from '../../domain/schemas/session';

export abstract class SessionRepository {
  abstract getUserSessions(id_user: number): Promise<Session[]>;

  abstract create(createSessionDto: CreateSessionJwtDto): Promise<Session>;

  abstract getByJwt(getSessionDto: GetSessionDto): Promise<Session | null>;

  abstract killSession(
    deleteSessionDto: DeleteSessionDto,
  ): Promise<Session | null>;
}
