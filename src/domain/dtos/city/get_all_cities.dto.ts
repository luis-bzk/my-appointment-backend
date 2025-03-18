import { IQuery } from '../../../utils';

export class GetAllCitiesDto {
  public limit: number;
  public offset: number;
  public id_province: number;

  constructor(limit: number, offset: number, id_province: number) {
    this.limit = limit;
    this.offset = offset;
    this.id_province = id_province;
  }

  static create(query: IQuery): [string?, GetAllCitiesDto?] {
    const { limit, offset, id_province } = query;

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

    const parsedIdProvince = id_province
      ? isNaN(parseInt(id_province, 10))
        ? null
        : parseInt(id_province, 10)
      : null;

    return [
      undefined,
      new GetAllCitiesDto(parsedLimit!, parsedOffset!, parsedIdProvince!),
    ];
  }
}
