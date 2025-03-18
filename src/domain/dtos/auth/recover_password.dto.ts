import { Validators } from '../../../config';

export class RecoverPasswordDto {
  public email: string;

  constructor(email: string) {
    this.email = email;
  }

  static create(object: {
    [key: string]: any;
  }): [string?, RecoverPasswordDto?] {
    const { email } = object;

    if (!email) return ['El email del usuario es requerido'];
    if (!Validators.email.test(email))
      return ['El email ingresado no es válido'];

    return [undefined, new RecoverPasswordDto(email.toLowerCase())];
  }
}
