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
