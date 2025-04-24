export class UserRole {
  constructor(
    public id: number,
    public created_date: Date,
    public record_status: string,
    public id_user: number,
    public id_role: number,
  ) {}
}
