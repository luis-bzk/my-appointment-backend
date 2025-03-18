export class GetUserRoleDto {
  public id: number;

  constructor(id: number) {
    this.id = id;
  }

  static create(params: { [key: string]: string }): [string?, GetUserRoleDto?] {
    const { id } = params;

    const parsedId = parseInt(id, 10);

    if (!id) return ['El ID del registro es necesario'];
    if (isNaN(parsedId)) return ['El ID del registro no es valido'];

    return [undefined, new GetUserRoleDto(parsedId)];
  }
}
