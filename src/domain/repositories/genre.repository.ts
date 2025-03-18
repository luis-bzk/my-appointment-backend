import {
  CreateGenreDto,
  DeleteGenreDto,
  GetAllGenresDto,
  GetGenreDto,
  UpdateGenreDto,
} from '../dtos/genre';
import { Genre } from '../entities';

export abstract class GenreRepository {
  abstract create(createGenreDto: CreateGenreDto): Promise<Genre>;

  abstract update(updateGenreDto: UpdateGenreDto): Promise<Genre>;

  abstract get(getGenreDto: GetGenreDto): Promise<Genre>;

  abstract getAll(getAllGenreDto: GetAllGenresDto): Promise<Genre[]>;

  abstract delete(deleteGenreDto: DeleteGenreDto): Promise<Genre>;
}
