import { Session } from '../entities';

import { RequireSession } from '../use_cases/session';
import { RequireSessionDto } from '../dtos/session';
import { SessionRepository } from '../../adapters/repositories';

export class AuthService {
  private readonly sessionRepository: SessionRepository;

  constructor(sessionRepository: SessionRepository) {
    this.sessionRepository = sessionRepository;
  }

  authenticateUser = async (token: string): Promise<Session | null> => {
    const [error, requireSessionDto] = RequireSessionDto.create(token);
    if (error) return null;

    try {
      const requireSession = new RequireSession(this.sessionRepository);
      return await requireSession.execute(requireSessionDto!);
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
