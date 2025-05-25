import { Genre } from '../../entities';
import { CustomError } from '../../errors';
import { GenreRepository } from '../../../ports/repositories';
import { GenreIdPortDto, GenreIdSchema } from '../../schemas/genre';

export class GetGenreUseCase {
  private readonly genreRepository: GenreRepository;

  constructor(genreRepository: GenreRepository) {
    this.genreRepository = genreRepository;
  }

  async execute(dto: GenreIdPortDto): Promise<Genre> {
    const { success, error, data: schema } = GenreIdSchema.safeParse(dto);
    if (!success) {
      const errorMessage = error.errors[0].message || 'Datos inválidos';
      throw CustomError.badRequest(errorMessage);
    }

    const parsedId = parseInt(schema.id, 10);

    const genre = await this.genreRepository.getGenreById(parsedId);
    if (!genre) {
      throw CustomError.notFound('No se encontró el género solicitado');
    }

    return genre;
  }
}
