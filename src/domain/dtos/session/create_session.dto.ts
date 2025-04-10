export class CreateSessionDto {
  public jwt: string;
  public id_user: number;
  public expire_date: Date;
  public ip: string;
  public user_agent: string;

  constructor(
    jwt: string,
    id_user: number,
    expire_date: Date,
    ip: string,
    user_agent: string,
  ) {
    this.jwt = jwt;
    this.id_user = id_user;
    this.expire_date = expire_date;
    this.ip = ip;
    this.user_agent = user_agent;
  }

  static create(object: { [key: string]: any }): [string?, CreateSessionDto?] {
    const { jwt, id_user, expire_date, ip, user_agent } = object;

    if (!jwt) return ['El JWT es necesario'];
    if (!id_user) return ['El ID del usuario es necesario'];
    if (!expire_date) return ['La fecha de expiración es necesaria'];
    if (!ip) return ['La IP es necesaria'];
    if (!user_agent) return ['El user agent es necesario'];

    return [
      undefined,
      new CreateSessionDto(jwt, id_user, expire_date, ip, user_agent),
    ];
  }
}
