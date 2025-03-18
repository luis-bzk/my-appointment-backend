export class GetRoleDto {
  public id: number;

  constructor(id: number) {
    this.id = id;
  }

  static create(params: { [key: string]: string }): [string?, GetRoleDto?] {
    const { id } = params;

    const parsedId = parseInt(id, 10);

    // make validation
    if (!id) return ['El ID del rol es requerido'];
    if (isNaN(parsedId)) return ['El ID del rol no es valido'];

    return [undefined, new GetRoleDto(parsedId)];
  }
}
