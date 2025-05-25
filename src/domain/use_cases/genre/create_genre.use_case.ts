import { Genre } from '../../entities';
import { GenreRepository } from '../../../ports/repositories';
import { CreateGenreDto, CreateGenreSchema } from '../../schemas/genre';
import { CustomError } from '../../errors';

export class CreateGenreUseCase {
  private readonly genreRepository: GenreRepository;

  constructor(genreRepository: GenreRepository) {
    this.genreRepository = genreRepository;
  }

  async execute(dto: CreateGenreDto): Promise<Genre> {
    const { success, error, data: schema } = CreateGenreSchema.safeParse(dto);
    if (!success) {
      const errorMessage = error.errors[0].message || 'Datos inválidos';
      throw CustomError.badRequest(errorMessage);
    }

    const genreName = await this.genreRepository.getGenreByName(schema.name);
    if (genreName) {
      throw CustomError.conflict('El nombre de género ya existe');
    }

    const genre = await this.genreRepository.createGenre(schema);
    if (!genre) {
      throw CustomError.internalServer('Error al crear el género');
    }

    return genre;
  }
}
