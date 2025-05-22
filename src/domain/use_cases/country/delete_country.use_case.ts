import { Country } from '../../entities';
import {
  CountryIdDto,
  CountryIdPortDto,
  CountryIdSchema,
} from '../../schemas/country';
import { CustomError } from '../../errors';
import { RECORD_STATUS } from '../../../shared';
import { CountryRepository } from '../../../ports/repositories';

export class DeleteCountryUseCase {
  private readonly countryRepository: CountryRepository;

  constructor(countryRepository: CountryRepository) {
    this.countryRepository = countryRepository;
  }

  async execute(dto: CountryIdPortDto): Promise<Country> {
    const { success, error, data: schema } = CountryIdSchema.safeParse(dto);
    if (!success) {
      const message = error.errors[0]?.message || 'Datos inválidos';
      throw CustomError.badRequest(message);
    }

    const parsedSchema: CountryIdDto = {
      id: parseInt(schema.id, 10),
    };

    const country = await this.countryRepository.getCountryById(
      parsedSchema.id,
    );
    if (!country || country.record_status === RECORD_STATUS.UNAVAILABLE) {
      throw CustomError.notFound('No se ha encontrado el país a eliminar');
    }

    const deletedCountry = await this.countryRepository.deleteCountry(
      parsedSchema.id,
    );
    if (!deletedCountry) {
      throw CustomError.internalServer('No se pudo eliminar el país');
    }

    return country;
  }
}
