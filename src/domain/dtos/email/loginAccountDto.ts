export class LoginAccountDto {
  public email: string;
  public name: string;
  public last_name: string;
  public password: string;

  constructor(
    email: string,
    name: string,
    last_name: string,
    password: string,
  ) {
    this.email = email;
    this.name = name;
    this.last_name = last_name;
    this.password = password;
  }

  static create(object: { [key: string]: any }): [string?, LoginAccountDto?] {
    const { name, last_name, email, password } = object;

    if (!name) return ['El nombre del usuario es requerido'];
    if (!last_name) return ['El apellido del usuario es requerido'];
    if (!email) return ['El email del usuario es requerido'];
    if (!password) return ['El password del usuario es requerido'];

    return [undefined, new LoginAccountDto(email, name, last_name, password)];
  }
}
