export class DeleteUserDto {
  public id: number;

  constructor(id: number) {
    this.id = id;
  }

  static create(params: { [key: string]: string }): [string?, DeleteUserDto?] {
    const { id } = params;
    const parsedId = parseInt(id, 10);

    if (!id) ['El ID del usuario es requerido'];
    if (isNaN(parsedId)) ['El ID del usuario no es valido'];

    return [undefined, new DeleteUserDto(parsedId)];
  }
}
