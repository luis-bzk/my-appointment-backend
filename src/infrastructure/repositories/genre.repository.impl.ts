import { GenreMapper } from '../mappers';
import { Genre } from '../../domain/entities';
import { GenreRepository } from '../../ports/repositories';
import { GenreDataSource } from '../../ports/data_sources';
import { CreateGenreDto, UpdateGenreDto } from '../../domain/schemas/genre';
import { GetAllFiltersDto } from '../../domain/schemas/general';

export class GenreRepositoryImpl implements GenreRepository {
  private readonly genreDataSource: GenreDataSource;

  constructor(genreDAtaSource: GenreDataSource) {
    this.genreDataSource = genreDAtaSource;
  }

  async getGenreByName(name: string): Promise<Genre | null> {
    const genre = await this.genreDataSource.getGenreByName(name);
    return GenreMapper.entityFromObject(genre);
  }

  async createGenre(createGenreDto: CreateGenreDto): Promise<Genre | null> {
    const genre = await this.genreDataSource.createGenre(createGenreDto);
    return GenreMapper.entityFromObject(genre);
  }
  async getGenreById(id: number): Promise<Genre | null> {
    const genre = await this.genreDataSource.getGenreById(id);
    return GenreMapper.entityFromObject(genre);
  }

  async getGenreByNameId(id: number, name: string): Promise<Genre | null> {
    const genre = await this.genreDataSource.getGenreByNameId(id, name);
    return GenreMapper.entityFromObject(genre);
  }

  async updateGenre(updateGenreDto: UpdateGenreDto): Promise<Genre | null> {
    const genre = await this.genreDataSource.updateGenre(updateGenreDto);
    return GenreMapper.entityFromObject(genre);
  }

  async getAllGenres(dto: GetAllFiltersDto): Promise<Genre[]> {
    const genres = await this.genreDataSource.getAllGenres(dto);
    return GenreMapper.entitiesFromArray(genres);
  }

  async deleteGenre(id: number): Promise<Genre | null> {
    const genre = await this.genreDataSource.deleteGenre(id);
    return GenreMapper.entityFromObject(genre);
  }
}
