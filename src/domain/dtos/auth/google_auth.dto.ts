export class GoogleAuthDto {
  public email: string;
  public name: string;
  public given_name: string;
  public picture: string;
  public id: string;

  constructor(
    email: string,
    name: string,
    given_name: string,
    picture: string,
    id: string,
  ) {
    this.email = email;
    this.name = name;
    this.given_name = given_name;
    this.picture = picture;
    this.id = id;
  }

  static create(
    email: string,
    name: string,
    given_name: string,
    picture: string,
    id: string,
  ): [string?, GoogleAuthDto?] {
    if (!email) return ['El email es requerido.'];
    if (!name) return ['El nombre es requerido.'];
    if (!picture) return ['La foto es requerida.'];
    if (!id) return ['El ID es requerido.'];
    return [undefined, new GoogleAuthDto(email, name, given_name, picture, id)];
  }
}
