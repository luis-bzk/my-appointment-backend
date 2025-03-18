export class GetUserDto {
  public id: number;

  constructor(id: number) {
    this.id = id;
  }

  static create(params: { [key: string]: string }): [string?, GetUserDto?] {
    const { id } = params;

    const parsedId = parseInt(id, 10);

    if (!id) return ['El ID del usuario es requerido'];
    if (isNaN(parsedId)) return ['El ID del usuario no es valido'];

    return [undefined, new GetUserDto(parsedId)];
  }
}
