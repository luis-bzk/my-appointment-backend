import {
  CreateSessionDto,
  DeleteSessionDto,
  GetSessionDto,
} from '../../domain/dtos/session';
import { Session } from '../../domain/entities';
import { SessionDataSource } from '../../domain/data_sources';
import { SessionRepository } from '../../domain/repositories';

export class SessionRepositoryImpl implements SessionRepository {
  private readonly sessionDataSource: SessionDataSource;

  constructor(sessionDataSource: SessionDataSource) {
    this.sessionDataSource = sessionDataSource;
  }

  create(createSessionDto: CreateSessionDto): Promise<Session> {
    return this.sessionDataSource.create(createSessionDto);
  }

  getByJwt(getSessionDto: GetSessionDto): Promise<Session> {
    return this.sessionDataSource.getByJwt(getSessionDto);
  }

  killSession(deleteSessionDto: DeleteSessionDto): Promise<Session> {
    return this.sessionDataSource.killSession(deleteSessionDto);
  }
}
