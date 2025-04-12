import { CreateSessionDto } from '../../dtos/session';
import { Session } from '../../entities';
import { SessionRepository } from '../../repositories';

interface CreateSessionUseCase {
  execute(createSessionDto: CreateSessionDto): Promise<Session>;
}

export class CreateSession implements CreateSessionUseCase {
  private readonly sessionRepository: SessionRepository;

  constructor(sessionRepository: SessionRepository) {
    this.sessionRepository = sessionRepository;
  }

  async execute(createSessionDto: CreateSessionDto): Promise<Session> {
    //   token

    const session = await this.sessionRepository.create(createSessionDto!);

    return session;
  }
}
