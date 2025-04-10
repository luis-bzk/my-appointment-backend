import { Pool } from 'pg';

import { PostgresDatabase } from '../../data';
import { Session } from '../../domain/entities';
import { SessionDB } from '../../data/interfaces';
import { CustomError } from '../../domain/errors';
import { SessionMapper } from '../mappers/session.mapper';
import { SessionDataSource } from '../../domain/data_sources';
import {
  CreateSessionDto,
  DeleteSessionDto,
  GetSessionDto,
} from '../../domain/dtos/session';

export class SessionDataSourceImpl implements SessionDataSource {
  private pool: Pool;

  constructor() {
    this.pool = PostgresDatabase.getPool();
  }

  async create(createSessionDto: CreateSessionDto): Promise<Session> {
    const { id_user, jwt, expire_date, ip, user_agent } = createSessionDto;

    try {
      const sessions = await this.pool.query<SessionDB>(
        `select ses_id, ses_jwt, id_user
        from core.core_sessions ses
        where ses.id_user = $1;`,
        [id_user],
      );
      if (sessions.rows.length > 6) {
        throw CustomError.conflict(
          'Ya tienes 6 sesiones activas en este momento, por tu seguridad, cierra alguna de ellas para continuar',
        );
      }

      const sessionCreated = await this.pool.query<SessionDB>(
        `insert into
          core.core_sessions (
            ses_jwt, id_user, ses_created_date, ses_expires_at, 
            ses_ip, ses_user_agent ) 
        values ($1, $2, $3, $4, $5, $6 ) returning *;`,
        [jwt, id_user, new Date(), expire_date, ip, user_agent],
      );

      return SessionMapper.entityFromObject(sessionCreated.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer(
        'Error en el Data Source al crear la session',
      );
    }
  }

  async getByJwt(getSessionDto: GetSessionDto): Promise<Session> {
    const { jwt } = getSessionDto;

    try {
      const session = await this.pool.query<SessionDB>(
        `select ses_id, ses_jwt, id_user
            from core.core_sessions ses
            where ses.ses_jwt = $1;`,
        [jwt],
      );
      if (session.rows.length === 0) {
        throw CustomError.notFound(`No se ha encontrado la sesión`);
      }

      return SessionMapper.entityFromObject(session.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al obtener');
    }
  }

  async killSession(deleteSessionDto: DeleteSessionDto): Promise<Session> {
    const { jwt } = deleteSessionDto;

    try {
      const session = await this.pool.query<SessionDB>(
        `select ses_id, ses_jwt, id_user
                from core.core_sessions ses
                where ses.ses_jwt = $1;`,
        [jwt],
      );
      if (session.rows.length === 0) {
        throw CustomError.notFound(`No se ha encontrado la sesión`);
      }

      const deleted = await this.pool.query<SessionDB>(
        `delete from core.core_sessions
            where ses_jwt = $1 returning *;`,
        [jwt],
      );

      return SessionMapper.entityFromObject(deleted.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer(`Error en el Data Source al eliminar`);
    }
  }
}
