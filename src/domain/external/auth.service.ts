import { Session } from '../entities';

import { RequireSession } from '../use_cases/session';
import { SessionRepository } from '../../ports/repositories';

export class AuthService {
  private readonly sessionRepository: SessionRepository;

  constructor(sessionRepository: SessionRepository) {
    this.sessionRepository = sessionRepository;
  }

  authenticateUser = async (token: string): Promise<Session | null> => {
    try {
      return await new RequireSession(this.sessionRepository).execute({
        jwt: token,
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
