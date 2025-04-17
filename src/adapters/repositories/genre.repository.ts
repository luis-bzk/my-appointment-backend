import {
  CreateGenreDto,
  DeleteGenreDto,
  GetAllGenresDto,
  GetGenreDto,
  UpdateGenreDto,
} from '../../domain/dtos/genre';
import { Genre } from '../../domain/entities';

export abstract class GenreRepository {
  abstract create(createGenreDto: CreateGenreDto): Promise<Genre>;

  abstract update(updateGenreDto: UpdateGenreDto): Promise<Genre>;

  abstract get(getGenreDto: GetGenreDto): Promise<Genre>;

  abstract getAll(getAllGenreDto: GetAllGenresDto): Promise<Genre[]>;

  abstract delete(deleteGenreDto: DeleteGenreDto): Promise<Genre>;
}
