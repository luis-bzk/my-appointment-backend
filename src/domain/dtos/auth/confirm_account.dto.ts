export class ConfirmAccountDto {
  public token: string;

  constructor(token: string) {
    this.token = token;
  }

  static create(object: { [key: string]: any }): [string?, ConfirmAccountDto?] {
    const { token } = object;
    if (!token) return ['El token de seguridad es requerido.'];
    return [undefined, new ConfirmAccountDto(token)];
  }
}
