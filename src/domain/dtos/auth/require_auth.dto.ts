export class RequireAuthDto {
  public id: number;

  constructor(id: number) {
    this.id = id;
  }

  static create(id: number): [string?, RequireAuthDto?] {
    const parsedId = parseInt(id.toString(), 10);

    if (!id) ['El ID del usuario es requerido'];
    if (isNaN(parsedId)) ['El ID del usuario no es valido'];

    return [undefined, new RequireAuthDto(id)];
  }
}
