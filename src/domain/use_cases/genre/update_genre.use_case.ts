import { Genre } from '../../entities';
import { UpdateGenreDto } from '../../dtos/genre';
import { GenreRepository } from '../../../ports/repositories';

interface UpdateGenreUseCase {
  execute(updateGenreDto: UpdateGenreDto): Promise<Genre>;
}

export class UpdateGenre implements UpdateGenreUseCase {
  private readonly genreRepository: GenreRepository;

  constructor(genreRepository: GenreRepository) {
    this.genreRepository = genreRepository;
  }

  async execute(updateGenreDto: UpdateGenreDto): Promise<Genre> {
    return this.genreRepository.update(updateGenreDto);
  }
}
