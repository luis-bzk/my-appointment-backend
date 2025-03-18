export class DeleteUserRoleDto {
  public id: number;

  constructor(id: number) {
    this.id = id;
  }

  static create(params: {
    [key: string]: string;
  }): [string?, DeleteUserRoleDto?] {
    const { id } = params;

    const parsedId = parseInt(id, 10);

    if (!id) return ['El ID del registro es necesario'];
    if (isNaN(parsedId)) return ['El ID del registro no es valido'];

    return [undefined, new DeleteUserRoleDto(parsedId)];
  }
}
