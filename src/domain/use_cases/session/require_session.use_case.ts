import { Session } from '../../entities';
import { CustomError } from '../../errors';
import { SessionRepository } from '../../../adapters/repositories';
import { RequireSessionDto, RequireSessionSchema } from '../../schemas/session';

interface RequireSessionUseCase {
  execute(requireSessionDto: RequireSessionDto): Promise<Session>;
}

export class RequireSession implements RequireSessionUseCase {
  private readonly sessionRepository: SessionRepository;

  constructor(sessionRepository: SessionRepository) {
    this.sessionRepository = sessionRepository;
  }

  async execute(params: RequireSessionDto): Promise<Session> {
    const {
      success,
      error,
      data: schema,
    } = RequireSessionSchema.safeParse(params);
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
