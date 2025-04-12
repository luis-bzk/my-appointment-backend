export class RequireSessionDto {
  public jwt: string;

  constructor(jwt: string) {
    this.jwt = jwt;
  }

  static create(jwt: string): [string?, RequireSessionDto?] {
    if (!jwt) ['El token de sesión es requerido'];

    return [undefined, new RequireSessionDto(jwt)];
  }
}
