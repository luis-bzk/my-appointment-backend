import { Genre } from '../../entities';
import { DeleteGenreDto } from '../../dtos/genre';
import { GenreRepository } from '../../../ports/repositories';

interface DeleteGenreUseCase {
  execute(deleteGenreDto: DeleteGenreDto): Promise<Genre>;
}

export class DeleteGenre implements DeleteGenreUseCase {
  private readonly genreRepository: GenreRepository;

  constructor(genreRepository: GenreRepository) {
    this.genreRepository = genreRepository;
  }

  async execute(deleteGenreDto: DeleteGenreDto): Promise<Genre> {
    return this.genreRepository.delete(deleteGenreDto);
  }
}
