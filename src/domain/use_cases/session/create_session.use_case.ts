import { Session } from '../../entities';
import { CustomError } from '../../errors';
import { SessionRepository } from '../../../ports/repositories';
import { CreateSessionDto, CreateSessionSchema } from '../../schemas/session';
import { JwtAdapter } from '../../../config';

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

export class CreateSessionUseCase {
  private readonly sessionRepository: SessionRepository;
  private readonly signToken: SignToken;

  constructor(sessionRepository: SessionRepository) {
    this.sessionRepository = sessionRepository;
    this.signToken = JwtAdapter.generateToken;
  }

  async execute(createSessionDto: CreateSessionDto): Promise<Session> {
    const {
      success,
      error,
      data: schema,
    } = CreateSessionSchema.safeParse(createSessionDto);
    if (!success) {
      const message = error.errors[0]?.message || 'Datos inválidos';
      throw CustomError.badRequest(message);
    }

    const token = await this.signToken({ id: schema.id_user }, '24h');
    if (!token) throw CustomError.internalServer('Error al generar el token');

    const sessions = await this.sessionRepository.getUserSessions(
      schema.id_user,
    );
    if (sessions.length > 10) {
      throw CustomError.conflict(
        'Ya tienes 6 sesiones activas en este momento, por tu seguridad, cierra alguna de ellas para continuar',
      );
    }

    const sessionCreated = await this.sessionRepository.create({
      ...schema,
      jwt: token,
    });

    return sessionCreated;
  }
}
