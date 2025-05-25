import { Genre } from '../../entities';
import { GenreRepository } from '../../../ports/repositories';
import {
  UpdateGenreDto,
  UpdateGenrePortDto,
  UpdateGenreSchema,
} from '../../schemas/genre';
import { CustomError } from '../../errors';
import { RECORD_STATUS } from '../../../shared';

export class UpdateGenreUseCase {
  private readonly genreRepository: GenreRepository;

  constructor(genreRepository: GenreRepository) {
    this.genreRepository = genreRepository;
  }

  async execute(updateGenreDto: UpdateGenrePortDto): Promise<Genre> {
    const {
      success,
      error,
      data: schema,
    } = UpdateGenreSchema.safeParse(updateGenreDto);
    if (!success) {
      const errorMessage = error.errors[0].message || 'Datos inválidos';
      throw CustomError.badRequest(errorMessage);
    }

    const parsedSchema: UpdateGenreDto = {
      ...schema,
      id: parseInt(schema.id, 10),
    };

    const genreExist = await this.genreRepository.getGenreById(parsedSchema.id);
    if (!genreExist || genreExist.record_status === RECORD_STATUS.UNAVAILABLE) {
      throw CustomError.notFound('No se encontró el género a actualizar');
    }

    const genreName = await this.genreRepository.getGenreByNameId(
      parsedSchema.id,
      parsedSchema.name,
    );
    if (genreName) {
      throw CustomError.conflict('ya existe un género con el nombre ingresado');
    }

    const genre = await this.genreRepository.updateGenre(parsedSchema);
    if (!genre) {
      throw CustomError.internalServer('Error al actualizar el género');
    }

    return genre;
  }
}
