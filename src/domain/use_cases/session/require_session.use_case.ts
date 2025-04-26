import { Session } from '../../entities';
import { CustomError } from '../../errors';
import { SessionRepository } from '../../../adapters/repositories';
import { SessionJwtDto, SessionJwtSchema } from '../../schemas/session';

interface RequireSessionUseCase {
  execute(requireSessionDto: SessionJwtDto): Promise<Session>;
}

export class RequireSession implements RequireSessionUseCase {
  private readonly sessionRepository: SessionRepository;

  constructor(sessionRepository: SessionRepository) {
    this.sessionRepository = sessionRepository;
  }

  async execute(params: SessionJwtDto): Promise<Session> {
    const { success, error, data: schema } = SessionJwtSchema.safeParse(params);
    if (!success) {
      const message = error.errors[0]?.message || 'Datos inválidos';
      throw CustomError.badRequest(message);
    }

    const session = await this.sessionRepository.getByJwt(schema);
    if (!session) {
      throw CustomError.notFound('Session not found');
    }
    return session;
  }
}
