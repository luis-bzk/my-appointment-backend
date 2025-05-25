import { GenreDB } from '../../data/interfaces';
import { GetAllFiltersDto } from '../../domain/schemas/general';
import { CreateGenreDto, UpdateGenreDto } from '../../domain/schemas/genre';

export abstract class GenreDataSource {
  abstract getGenreByName(name: string): Promise<GenreDB | null>;

  abstract createGenre(createGenreDto: CreateGenreDto): Promise<GenreDB | null>;

  abstract getGenreById(id: number): Promise<GenreDB | null>;

  abstract getGenreByNameId(id: number, name: string): Promise<GenreDB | null>;

  abstract updateGenre(updateGenreDto: UpdateGenreDto): Promise<GenreDB | null>;

  abstract getAllGenres(dto: GetAllFiltersDto): Promise<GenreDB[]>;

  abstract deleteGenre(id: number): Promise<GenreDB | null>;
}
