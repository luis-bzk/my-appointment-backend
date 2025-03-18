export class CheckTokenDto {
  public token: string;

  constructor(token: string) {
    this.token = token;
  }

  static create(token: string): [string?, CheckTokenDto?] {
    if (!token) return ['El token de seguridad es requerido.'];

    return [undefined, new CheckTokenDto(token)];
  }
}
