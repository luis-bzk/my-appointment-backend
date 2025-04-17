import {
  CreateSessionDto,
  DeleteSessionDto,
  GetSessionDto,
} from '../../domain/dtos/session';
import { Session } from '../../domain/entities';
import { SessionDataSource } from '../../adapters/data_sources';
import { SessionRepository } from '../../adapters/repositories';
import { SessionMapper } from '../mappers/session.mapper';

export class SessionRepositoryImpl implements SessionRepository {
  private readonly sessionDataSource: SessionDataSource;

  constructor(sessionDataSource: SessionDataSource) {
    this.sessionDataSource = sessionDataSource;
  }

  async getUserSessions(id_user: number): Promise<Session[]> {
    const sessions = await this.sessionDataSource.getUserSessions(id_user);
    return SessionMapper.entitiesFromArray(sessions);
  }

  async create(createSessionDto: CreateSessionDto): Promise<Session> {
    const session = await this.sessionDataSource.create(createSessionDto);
    return SessionMapper.entityFromObject(session)!;
  }

  async getByJwt(getSessionDto: GetSessionDto): Promise<Session | null> {
    const session = await this.sessionDataSource.getByJwt(getSessionDto);
    return SessionMapper.entityFromObject(session);
  }

  async killSession(
    deleteSessionDto: DeleteSessionDto,
  ): Promise<Session | null> {
    const session = await this.sessionDataSource.killSession(deleteSessionDto);
    return SessionMapper.entityFromObject(session);
  }
}
