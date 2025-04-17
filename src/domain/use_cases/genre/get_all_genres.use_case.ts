import { Genre } from '../../entities';
import { GetAllGenresDto } from '../../dtos/genre';
import { GenreRepository } from '../../../adapters/repositories';

interface GetAllGenresUseCase {
  execute(getAllGenresDto: GetAllGenresDto): Promise<Genre[]>;
}

export class GetAllGenres implements GetAllGenresUseCase {
  private readonly genreRepository: GenreRepository;

  constructor(genreRepository: GenreRepository) {
    this.genreRepository = genreRepository;
  }

  async execute(getAllGenresDto: GetAllGenresDto): Promise<Genre[]> {
    return this.genreRepository.getAll(getAllGenresDto);
  }
}
