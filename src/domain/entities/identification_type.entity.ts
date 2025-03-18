import { Country } from './country.entity';

export class IdentificationType {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public abbreviation: string,
    public created_date: Date,
    public record_status: string,
    public id_country: number,
  ) {}
}

export class IdentificationTypeDetail extends IdentificationType {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public abbreviation: string,
    public created_date: Date,
    public record_status: string,
    public id_country: number,
    public country: Country,
  ) {
    super(
      id,
      name,
      description,
      abbreviation,
      created_date,
      record_status,
      id_country,
    );
  }
}
