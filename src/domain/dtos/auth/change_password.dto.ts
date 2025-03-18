import { Validators } from '../../../config';

export class ChangePasswordDto {
  public password: string;
  public token: string;

  constructor(password: string, token: string) {
    this.password = password;
    this.token = token;
  }

  static create(object: { [key: string]: any }): [string?, ChangePasswordDto?] {
    const { password, token } = object;

    if (!token) return ['El token de verificación es requerido'];
    if (!password) return ['La contraseña del usuario es requerida'];
    if (password.length < 8)
      return ['La contraseña del usuario debe tener mínimo 8 caracteres'];
    if (!Validators.passwordLowerCase.test(password))
      return ['La contraseña debe tener letras minúsculas'];
    if (!Validators.passwordUpperCase.test(password))
      return ['La contraseña debe tener letras mayúsculas'];
    if (!Validators.passwordNumbers.test(password))
      return ['La contraseña debe tener números'];
    if (!Validators.passwordSpecialChars.test(password))
      return ['La contraseña debe tener caracteres especiales'];

    return [undefined, new ChangePasswordDto(password, token)];
  }
}
