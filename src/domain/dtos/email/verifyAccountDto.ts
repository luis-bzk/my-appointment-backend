export class VerifyAccountDto {
  public email: string;
  public name: string;
  public last_name: string;
  public token: string;

  constructor(email: string, name: string, last_name: string, token: string) {
    this.email = email;
    this.name = name;
    this.last_name = last_name;
    this.token = token;
  }

  static create(object: { [key: string]: any }): [string?, VerifyAccountDto?] {
    const { name, last_name, email, token } = object;

    if (!name) return ['El nombre del usuario es requerido'];
    if (!last_name) return ['El apellido del usuario es requerido'];
    if (!email) return ['El email del usuario es requerido'];
    if (!token) return ['El token del usuario es requerido'];

    return [undefined, new VerifyAccountDto(email, name, last_name, token)];
  }
}
