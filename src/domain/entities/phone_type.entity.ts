export class PhoneType {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public created_date: Date,
    public record_status: string,
  ) {}
}
