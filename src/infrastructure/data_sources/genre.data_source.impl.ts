import { Pool } from 'pg';

import {
  CreateGenreDto,
  DeleteGenreDto,
  GetAllGenresDto,
  GetGenreDto,
  UpdateGenreDto,
} from '../../domain/dtos/genre';
import { Genre } from '../../domain/entities';
import { PostgresDatabase } from '../../data';
import { GenreDB } from '../../data/interfaces';
import { CustomError } from '../../domain/errors';
import { GenreMapper } from '../mappers/genre.mapper';
import { RECORD_STATUS } from '../../shared/constants';
import { GenreDataSource } from '../../domain/data_sources';

export class GenreDataSourceImpl implements GenreDataSource {
  private pool: Pool;

  constructor() {
    this.pool = PostgresDatabase.getPool();
  }

  async create(createGenreDto: CreateGenreDto): Promise<Genre> {
    const { name, description, abbreviation } = createGenreDto;

    try {
      // check name
      const genreName = await this.pool.query<GenreDB>(
        `select
          cg.gen_id,
          cg.gen_record_status
        from
          core.core_genre cg
        where
          lower(cg.gen_name) = $1
          and cg.gen_record_status = $2;`,
        [name, RECORD_STATUS.AVAILABLE],
      );
      if (genreName.rows.length > 0) {
        throw CustomError.conflict('Ya existe un genero con el mismo nombre');
      }

      // create
      const genreCreated = await this.pool.query<GenreDB>(
        `insert into
          core.core_genre (
            gen_name,
            gen_description,
            gen_abbreviation,
            gen_created_date,
            gen_record_status
          )
        values
          ($1, $2, $3, $4, $5) returning *;`,
        [name, description, abbreviation, new Date(), RECORD_STATUS.AVAILABLE],
      );
      return GenreMapper.entityFromObject(genreCreated.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el DataSource al crear');
    }
  }

  async update(updateGenreDto: UpdateGenreDto): Promise<Genre> {
    const { id, name, description, abbreviation } = updateGenreDto;
    try {
      // find register
      const genreFound = await this.pool.query(
        `select
          cg.gen_id,
          cg.gen_record_status
        from
          core.core_genre cg
        where
          cg.gen_id = $1
          and cg.gen_record_status = $2;`,
        [id, RECORD_STATUS.AVAILABLE],
      );
      if (genreFound.rows.length === 0) {
        throw CustomError.notFound(
          'No se ha encontrado el genero a actualizar',
        );
      }

      // other register name
      const genreName = await this.pool.query(
        `select
          cg.gen_id,
          cg.gen_record_status
        from
          core.core_genre cg
        where
          lower(cg.gen_name) = $1
          and cg.gen_id <> $2
          and cg.gen_record_status = $3;`,
        [name, id, RECORD_STATUS.AVAILABLE],
      );
      if (genreName.rows.length > 0) {
        throw CustomError.conflict(
          'Ya existe un registro con el nombre deseado',
        );
      }

      // update
      const updatedGenre = await this.pool.query(
        `update core.core_genre
        set
          gen_name = $1,
          gen_description = $2,
          gen_abbreviation = $3
        where
          core_genre.gen_id = $4 returning *;`,
        [name, description, abbreviation, id],
      );
      return GenreMapper.entityFromObject(updatedGenre.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el DataSource al crear');
    }
  }

  async get(getGenreDto: GetGenreDto): Promise<Genre> {
    const { id } = getGenreDto;
    try {
      // find register
      const genreFound = await this.pool.query(
        `select
          cg.gen_id,
          cg.gen_name,
          cg.gen_description,
          cg.gen_abbreviation,
          cg.gen_created_date,
          cg.gen_record_status
        from
          core.core_genre cg
        where
          cg.gen_id = $1
          and cg.gen_record_status = $2;`,
        [id, RECORD_STATUS.AVAILABLE],
      );
      if (genreFound.rows.length === 0) {
        throw CustomError.notFound('No se ha encontrado el registro deseado');
      }

      return GenreMapper.entityFromObject(genreFound.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el DataSource al crear');
    }
  }

  async getAll(getAllGenreDto: GetAllGenresDto): Promise<Genre[]> {
    const { limit, offset } = getAllGenreDto;
    try {
      const genres = await this.pool.query(
        `select
          cg.gen_id,
          cg.gen_name,
          cg.gen_description,
          cg.gen_abbreviation,
          cg.gen_created_date,
          cg.gen_record_status
        from
          core.core_genre cg
        order by
          cg.gen_name
        limit $1 offset $2;`,
        [limit, offset],
      );

      return GenreMapper.entitiesFromArray(genres.rows);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el DataSource al crear');
    }
  }

  async delete(deleteGenreDto: DeleteGenreDto): Promise<Genre> {
    const { id } = deleteGenreDto;
    try {
      // find register
      const genreFound = await this.pool.query(
        `select
          cg.gen_id,
          cg.gen_record_status
        from
          core.core_genre cg
        where
          cg.gen_id = $1
          and cg.gen_record_status = $2;`,
        [id, RECORD_STATUS.AVAILABLE],
      );
      if (genreFound.rows.length === 0) {
        throw CustomError.notFound(
          'No se ha encontrado el registro a eliminar',
        );
      }

      // delete
      const deletedGenre = await this.pool.query(
        `delete from core.core_genre cg
        where
          cg.gen_id = $1 returning *;`,
      );
      return GenreMapper.entityFromObject(deletedGenre.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el DataSource al crear');
    }
  }
}
