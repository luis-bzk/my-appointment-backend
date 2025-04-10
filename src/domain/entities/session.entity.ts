export class Session {
  constructor(
    public id: number,
    public jwt: string,
    public id_user: number,
    public created_date: Date,
    public expires_at: Date,
    public ip: string,
    public user_agent: string,
  ) {}
}
