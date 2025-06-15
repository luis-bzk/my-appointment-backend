import { Genre } from '../../entities';
import { GenreRepository } from '../../../ports/repositories';
import {
  GetAllFiltersDto,
  GetAllFiltersPortDto,
  GetAllFiltersSchema,
} from '../../schemas/general';
import { CustomError } from '../../errors';

export class GetAllGenresUseCase {
  private readonly genreRepository: GenreRepository;

  constructor(genreRepository: GenreRepository) {
    this.genreRepository = genreRepository;
  }

  async execute(dto: GetAllFiltersPortDto): Promise<Genre[]> {
    const { success, error, data: schema } = GetAllFiltersSchema.safeParse(dto);
    if (!success) {
      const message = error.errors[0]?.message || 'Datos inválidos';
      throw CustomError.badRequest(message);
    }

    const parsedSchema: GetAllFiltersDto = {
      ...schema,
      limit: schema.limit ? parseInt(schema.limit ?? '', 10) : undefined,
      offset: schema.offset ? parseInt(schema.offset ?? '', 10) : undefined,
    };

    const genres = await this.genreRepository.getAllGenres(parsedSchema);
    return genres;
  }
}
