import { Country } from '../../entities';
import { CountryRepository } from '../../../ports/repositories';
import {
  UpdateCountryDto,
  UpdateCountryPortDto,
  UpdateCountrySchema,
} from '../../schemas/country';
import { CustomError } from '../../errors';
import { RECORD_STATUS } from '../../../shared';

export class UpdateCountryUseCase {
  private readonly countryRepository: CountryRepository;

  constructor(countryRepository: CountryRepository) {
    this.countryRepository = countryRepository;
  }

  async execute(dto: UpdateCountryPortDto): Promise<Country> {
    const { success, error, data: schema } = UpdateCountrySchema.safeParse(dto);

    if (!success) {
      const message = error.errors[0]?.message || 'Datos inválidos';
      throw CustomError.badRequest(message);
    }

    const schemaParsed: UpdateCountryDto = {
      ...schema,
      id: parseInt(schema.id, 10),
    };

    const countryId = await this.countryRepository.getCountryById(
      schemaParsed.id,
    );

    if (!countryId || countryId.record_status === RECORD_STATUS.UNAVAILABLE) {
      throw CustomError.notFound('No se ha encontrado el país a actualizar');
    }

    const countryNameId = await this.countryRepository.getCountryByNameId(
      schemaParsed.id,
      schemaParsed.name.toLowerCase(),
    );
    if (countryNameId) {
      throw CustomError.conflict('Ya existe un país con el nombre ingresado');
    }

    const updatedCountry =
      await this.countryRepository.updateCountry(schemaParsed);

    if (!updatedCountry) {
      throw CustomError.internalServer('No se pudo actualizar el país');
    }

    return updatedCountry;
  }
}
