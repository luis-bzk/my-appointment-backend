import { Genre } from '../../entities';
import { GenreRepository } from '../../../ports/repositories';
import { GenreIdPortDto, GenreIdSchema } from '../../schemas/genre';
import { CustomError } from '../../errors';
import { RECORD_STATUS } from '../../../shared';

export class DeleteGenreUseCase {
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
    if (!genre || genre.record_status === RECORD_STATUS.UNAVAILABLE) {
      throw CustomError.notFound('No se encontró el género a eliminar');
    }

    const genreDeleted = await this.genreRepository.deleteGenre(parsedId);
    if (!genreDeleted) {
      throw CustomError.internalServer('Error al eliminar el género');
    }

    return genreDeleted;
  }
}
