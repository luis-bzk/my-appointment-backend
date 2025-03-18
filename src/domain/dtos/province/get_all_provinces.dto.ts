import { IQuery } from '../../../utils';

export class GetAllProvincesDto {
  public limit: number;
  public offset: number;
  public id_country: number;

  constructor(limit: number, offset: number, id_country: number) {
    this.limit = limit;
    this.offset = offset;
    this.id_country = id_country;
  }

  static create(query: IQuery): [string?, GetAllProvincesDto?] {
    const { limit, offset, id_country } = query;
    const parsedLimit = limit
      ? isNaN(parseInt(limit, 10))
        ? null
        : parseInt(limit, 10)
      : null;

    const parsedOffset = offset
      ? isNaN(parseInt(offset, 10))
        ? null
        : parseInt(offset, 10)
      : null;

    const parsedIdCountry = id_country
      ? isNaN(parseInt(id_country, 10))
        ? null
        : parseInt(id_country, 10)
      : null;

    return [
      undefined,
      new GetAllProvincesDto(parsedLimit!, parsedOffset!, parsedIdCountry!),
    ];
  }
}
