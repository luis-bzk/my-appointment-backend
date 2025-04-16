import { SessionDB } from '../../data/interfaces';
import {
  CreateSessionDto,
  DeleteSessionDto,
  GetSessionDto,
} from '../dtos/session';

export abstract class SessionDataSource {
  abstract getUserSessions(id_user: number): Promise<SessionDB[]>;

  abstract create(createSessionDto: CreateSessionDto): Promise<SessionDB>;

  abstract getByJwt(getSessionDto: GetSessionDto): Promise<SessionDB | null>;

  abstract killSession(
    deleteSessionDto: DeleteSessionDto,
  ): Promise<SessionDB | null>;
}
