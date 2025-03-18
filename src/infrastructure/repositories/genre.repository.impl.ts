import {
  CreateGenreDto,
  DeleteGenreDto,
  GetAllGenresDto,
  GetGenreDto,
  UpdateGenreDto,
} from '../../domain/dtos/genre';
import { Genre } from '../../domain/entities';
import { GenreRepository } from '../../domain/repositories';
import { GenreDataSource } from '../../domain/data_sources';

export class GenreRepositoryImpl implements GenreRepository {
  private readonly genreDataSource: GenreDataSource;

  constructor(genreDAtaSource: GenreDataSource) {
    this.genreDataSource = genreDAtaSource;
  }

  create(createGenreDto: CreateGenreDto): Promise<Genre> {
    return this.genreDataSource.create(createGenreDto);
  }

  update(updateGenreDto: UpdateGenreDto): Promise<Genre> {
    return this.genreDataSource.update(updateGenreDto);
  }

  get(getGenreDto: GetGenreDto): Promise<Genre> {
    return this.genreDataSource.get(getGenreDto);
  }

  getAll(getAllGenreDto: GetAllGenresDto): Promise<Genre[]> {
    return this.genreDataSource.getAll(getAllGenreDto);
  }

  delete(deleteGenreDto: DeleteGenreDto): Promise<Genre> {
    return this.genreDataSource.delete(deleteGenreDto);
  }
}
