import { Session } from '../../domain/entities';
import {
  CreateSessionJwtDto,
  SessionJwtDto,
} from '../../domain/schemas/session';

export abstract class SessionRepository {
  abstract getUserSessions(id_user: number): Promise<Session[]>;

  abstract create(createSessionDto: CreateSessionJwtDto): Promise<Session>;

  abstract getByJwt(getSessionDto: SessionJwtDto): Promise<Session | null>;

  abstract killSession(
    deleteSessionDto: SessionJwtDto,
  ): Promise<Session | null>;
}
