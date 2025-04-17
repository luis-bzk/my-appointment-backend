import { RequireSessionDto } from '../../dtos/session';
import { Session } from '../../entities';
import { CustomError } from '../../errors';
import { SessionRepository } from '../../../adapters/repositories';

interface RequireSessionUseCase {
  execute(requireSessionDto: RequireSessionDto): Promise<Session>;
}

export class RequireSession implements RequireSessionUseCase {
  private readonly sessionRepository: SessionRepository;

  constructor(sessionRepository: SessionRepository) {
    this.sessionRepository = sessionRepository;
  }

  async execute(requireSessionDto: RequireSessionDto): Promise<Session> {
    const session = await this.sessionRepository.getByJwt(requireSessionDto);
    if (!session) {
      throw CustomError.notFound('Session not found');
    }
    return session;
  }
}
