import { SessionDB } from '../../data/interfaces';
import {
  CreateSessionJwtDto,
  SessionJwtDto,
} from '../../domain/schemas/session';

export abstract class SessionDataSource {
  abstract getUserSessions(id_user: number): Promise<SessionDB[]>;

  abstract create(createSessionDto: CreateSessionJwtDto): Promise<SessionDB>;

  abstract getByJwt(getSessionDto: SessionJwtDto): Promise<SessionDB | null>;

  abstract killSession(
    deleteSessionDto: SessionJwtDto,
  ): Promise<SessionDB | null>;
}
