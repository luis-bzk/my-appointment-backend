import { CreateSessionDto } from '../../dtos/session';
import { Session } from '../../entities';
import { CustomError } from '../../errors';
import { SessionRepository } from '../../../adapters/repositories';

interface CreateSessionUseCase {
  execute(createSessionDto: CreateSessionDto): Promise<Session>;
}

export class CreateSession implements CreateSessionUseCase {
  private readonly sessionRepository: SessionRepository;

  constructor(sessionRepository: SessionRepository) {
    this.sessionRepository = sessionRepository;
  }

  async execute(createSessionDto: CreateSessionDto): Promise<Session> {
    const sessions = await this.sessionRepository.getUserSessions(
      createSessionDto.id_user,
    );
    if (sessions.length > 10) {
      throw CustomError.conflict(
        'Ya tienes 6 sesiones activas en este momento, por tu seguridad, cierra alguna de ellas para continuar',
      );
    }

    const sessionCreated =
      await this.sessionRepository.create(createSessionDto);

    return sessionCreated;
  }
}
