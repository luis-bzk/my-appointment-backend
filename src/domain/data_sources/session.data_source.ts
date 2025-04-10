import {
  CreateSessionDto,
  DeleteSessionDto,
  GetSessionDto,
} from '../dtos/session';
import { Session } from '../entities';

export abstract class SessionDataSource {
  abstract create(createSessionDto: CreateSessionDto): Promise<Session>;

  abstract getByJwt(getSessionDto: GetSessionDto): Promise<Session>;

  abstract killSession(deleteSessionDto: DeleteSessionDto): Promise<Session>;
}
