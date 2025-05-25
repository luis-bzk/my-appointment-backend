import { Pool } from 'pg';

import { PostgresDatabase } from '../../data';
import { GenreDB } from '../../data/interfaces';
import { CustomError } from '../../domain/errors';
import { RECORD_STATUS } from '../../shared/constants';
import { GenreDataSource } from '../../ports/data_sources';
import { CreateGenreDto, UpdateGenreDto } from '../../domain/schemas/genre';
import { GetAllFiltersDto } from '../../domain/schemas/general';

export class GenreDataSourceImpl implements GenreDataSource {
  private pool: Pool;

  constructor() {
    this.pool = PostgresDatabase.getPool();
  }

  async getGenreByName(name: string): Promise<GenreDB | null> {
    try {
      const genreName = await this.pool.query<GenreDB>(
        `select cg.gen_id, cg.gen_name, cg.gen_description, 
        cg.gen_abbreviation,  cg.gen_created_date, cg.gen_record_status 
        from core.core_genre cg 
        where lower(cg.gen_name) = $1;`,
        [name],
      );
      return genreName.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el DataSource al crear');
    }
  }

  async createGenre(createGenreDto: CreateGenreDto): Promise<GenreDB | null> {
    const { name, description, abbreviation } = createGenreDto;

    try {
      const genreCreated = await this.pool.query<GenreDB>(
        `insert into core.core_genre (
        gen_name, gen_description, gen_abbreviation, gen_created_date, gen_record_status
        ) values ($1, $2, $3, $4, $5) returning *;`,
        [name, description, abbreviation, new Date(), RECORD_STATUS.AVAILABLE],
      );
      return genreCreated.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el DataSource al crear');
    }
  }

  async getGenreById(id: number): Promise<GenreDB | null> {
    try {
      const genre = await this.pool.query<GenreDB>(
        `select cg.gen_id, cg.gen_name, cg.gen_description, 
        cg.gen_abbreviation,  cg.gen_created_date, cg.gen_record_status 
        from core.core_genre cg 
        where cg.gen_id = $1;`,
        [id],
      );

      return genre.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el DataSource al crear');
    }
  }

  async getGenreByNameId(id: number, name: string): Promise<GenreDB | null> {
    try {
      const genreName = await this.pool.query<GenreDB>(
        `select cg.gen_id, cg.gen_name, cg.gen_description, 
        cg.gen_abbreviation,  cg.gen_created_date, cg.gen_record_status 
        from core.core_genre cg 
        where lower(cg.gen_name) = $1 and cg.gen_id <> $2;`,
        [name, id],
      );

      return genreName.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el DataSource al crear');
    }
  }

  async updateGenre(updateGenreDto: UpdateGenreDto): Promise<GenreDB | null> {
    const { id, name, description, abbreviation } = updateGenreDto;
    try {
      const updatedGenre = await this.pool.query<GenreDB>(
        `update core.core_genre
        set gen_name = $1, gen_description = $2, gen_abbreviation = $3
        where core_genre.gen_id = $4 returning *;`,
        [name, description, abbreviation, id],
      );
      return updatedGenre.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el DataSource al crear');
    }
  }

  async getAllGenres(dto: GetAllFiltersDto): Promise<GenreDB[]> {
    const { limit = 50, offset = 0 } = dto;
    try {
      let query = `select cg.gen_id, cg.gen_name, cg.gen_description, 
      cg.gen_abbreviation, cg.gen_created_date, cg.gen_record_status 
      from core.core_genre cg `;

      const params: any[] = [];
      let paramIndex = 1;

      query += ` order by cg.gen_id `;

      query += ` limit $${paramIndex++}`;
      params.push(limit);

      query += ` offset $${paramIndex++}`;
      params.push(offset);

      const genres = await this.pool.query<GenreDB>(query, params);

      return genres.rows;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer(
        'Error en el DataSource al obtener todos',
      );
    }
  }

  async deleteGenre(id: number): Promise<GenreDB | null> {
    try {
      const updatedGenre = await this.pool.query<GenreDB>(
        `update core.core_genre
        set gen_record_status = $1
        where core_genre.gen_id = $2 returning *;`,
        [RECORD_STATUS.UNAVAILABLE, id],
      );
      return updatedGenre.rows[0];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el DataSource al eliminar');
    }
  }
}
