import { Genre } from '../../domain/entities';
import { GetAllFiltersDto } from '../../domain/schemas/general';
import { CreateGenreDto, UpdateGenreDto } from '../../domain/schemas/genre';

export abstract class GenreRepository {
  abstract getGenreByName(name: string): Promise<Genre | null>;

  abstract createGenre(createGenreDto: CreateGenreDto): Promise<Genre | null>;

  abstract getGenreById(id: number): Promise<Genre | null>;

  abstract getGenreByNameId(id: number, name: string): Promise<Genre | null>;

  abstract updateGenre(updateGenreDto: UpdateGenreDto): Promise<Genre | null>;

  abstract getAllGenres(dto: GetAllFiltersDto): Promise<Genre[]>;

  abstract deleteGenre(id: number): Promise<Genre | null>;
}
