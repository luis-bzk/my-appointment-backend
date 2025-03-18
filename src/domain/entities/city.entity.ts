export class City {
  constructor(
    public id: number,
    public name: string,
    public created_date: Date,
    public record_status: string,
    public id_country: number,
    public id_province: number,
  ) {}
}
