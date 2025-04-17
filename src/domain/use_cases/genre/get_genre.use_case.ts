import { Genre } from '../../entities';
import { GetGenreDto } from '../../dtos/genre';
import { GenreRepository } from '../../../adapters/repositories';

interface GetGenreUseCase {
  execute(getGenreDto: GetGenreDto): Promise<Genre>;
}

export class GetGenre implements GetGenreUseCase {
  private readonly genreRepository: GenreRepository;

  constructor(genreRepository: GenreRepository) {
    this.genreRepository = genreRepository;
  }

  async execute(getGenreDto: GetGenreDto): Promise<Genre> {
    return this.genreRepository.get(getGenreDto);
  }
}
