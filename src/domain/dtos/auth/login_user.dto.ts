import { Validators } from '../../../config';

export class LoginUserDto {
  public email: string;
  public password: string;
  public ip: string;
  public user_agent: string;

  constructor(email: string, password: string, ip: string, user_agent: string) {
    this.email = email;
    this.password = password;
    this.ip = ip;
    this.user_agent = user_agent;
  }

  static create(
    object: { [key: string]: any },
    ip: string,
    userAgent: string,
  ): [string?, LoginUserDto?] {
    const { email, password } = object;

    // validations
    if (!email) return ['El email del usuario es requerido'];
    if (!Validators.email.test(email)) return ['El email no es valido'];
    if (!password) return ['La contraseña del usuario es requerida'];

    return [
      undefined,
      new LoginUserDto(email.toLowerCase(), password, ip, userAgent),
    ];
  }
}
