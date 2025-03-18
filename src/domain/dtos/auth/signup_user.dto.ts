import { Validators } from '../../../config';

export class SignupUserDto {
  public name: string;
  public last_name: string;
  public email: string;
  public password: string;

  constructor(
    name: string,
    last_name: string,
    email: string,
    password: string,
  ) {
    this.name = name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
  }

  static create(object: { [key: string]: any }): [string?, SignupUserDto?] {
    const { name, last_name, email, password } = object;

    // make validation
    if (!name) return ['El nombre del usuario es requerido'];
    if (!last_name) return ['El apellido del usuario es requerido'];
    if (!email) return ['El email del usuario es requerido'];
    if (!Validators.email.test(email)) return ['El email no es válido'];
    if (!password) return ['La contraseña del usuario es requerida'];
    if (password.length < 8)
      return ['La contraseña debe tener mínimo 8 caracteres'];
    if (!Validators.passwordLowerCase.test(password))
      return ['La contraseña debe tener letras minúsculas'];
    if (!Validators.passwordUpperCase.test(password))
      return ['La contraseña debe tener letras mayúsculas'];
    if (!Validators.passwordNumbers.test(password))
      return ['La contraseña debe tener números'];
    if (!Validators.passwordSpecialChars.test(password))
      return ['La contraseña debe tener caracteres especiales'];

    return [
      undefined,
      new SignupUserDto(
        name.toLowerCase(),
        last_name.toLowerCase(),
        email.toLowerCase(),
        password,
      ),
    ];
  }
}
