export class User {
  constructor(
    public id: number,
    public name: string,
    public last_name: string,
    public email: string,
    public password: string,
    public token: string,
    public created_date: Date,
    public record_status: string,
    public google_id: string,
  ) {}
}
