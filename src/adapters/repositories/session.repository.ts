import {
  CreateSessionDto,
  GetSessionDto,
  DeleteSessionDto,
} from '../../domain/dtos/session';
import { Session } from '../../domain/entities';

export abstract class SessionRepository {
  abstract getUserSessions(id_user: number): Promise<Session[]>;

  abstract create(createSessionDto: CreateSessionDto): Promise<Session>;

  abstract getByJwt(getSessionDto: GetSessionDto): Promise<Session | null>;

  abstract killSession(
    deleteSessionDto: DeleteSessionDto,
  ): Promise<Session | null>;
}
