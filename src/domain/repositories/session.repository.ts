import {
  CreateSessionDto,
  GetSessionDto,
  DeleteSessionDto,
} from '../dtos/session';
import { Session } from '../entities';

export abstract class SessionRepository {
  abstract getUserSessions(id_user: number): Promise<Session[]>;

  abstract create(createSessionDto: CreateSessionDto): Promise<Session>;

  abstract getByJwt(getSessionDto: GetSessionDto): Promise<Session | null>;

  abstract killSession(
    deleteSessionDto: DeleteSessionDto,
  ): Promise<Session | null>;
}
