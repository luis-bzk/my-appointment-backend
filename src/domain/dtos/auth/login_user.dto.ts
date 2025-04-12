import { Validators } from '../../../config';

export class LoginUserDto {
  public email: string;
  public password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password } = object;

    // validations
    if (!email) return ['El email del usuario es requerido'];
    if (!Validators.email.test(email)) return ['El email no es valido'];
    if (!password) return ['La contraseña del usuario es requerida'];

    return [undefined, new LoginUserDto(email.toLowerCase(), password)];
  }
}
