import { Validators } from '../../../config';

export class UpdateUserDto {
  public id: number;
  public name: string;
  public last_name: string;
  public email: string;

  constructor(id: number, name: string, last_name: string, email: string) {
    this.id = id;
    this.name = name;
    this.last_name = last_name;
    this.email = email;
  }

  static create(
    params: { [key: string]: string },
    object: { [key: string]: any },
  ): [string?, UpdateUserDto?] {
    const { id } = params;
    const { name, last_name, email } = object;
    const parsedId = parseInt(id, 10);

    if (!id) return ['El ID del usuario es necesario'];
    if (isNaN(parsedId)) return ['El ID del usuario no es válido'];

    if (!name) return ['El nombre del usuario es requerido'];
    if (name.length > 100)
      return ['El nombre del usuario no puede tener mas de 100 caracteres'];

    if (!last_name) return ['El apellido del usuario es requerido'];
    if (last_name.length > 100)
      return ['El apellido del usuario no puede tener mas de 100 caracteres'];

    if (!email) return ['El email del usuario es requerido'];
    if (email.length > 100)
      return ['El email del usuario no puede tener mas de 100 caracteres'];
    if (!Validators.email.test(email))
      return ['El email del usuario no es válido'];

    return [
      undefined,
      new UpdateUserDto(
        parsedId,
        name.toLowerCase(),
        last_name.toLowerCase(),
        email.toLowerCase(),
      ),
    ];
  }
}
