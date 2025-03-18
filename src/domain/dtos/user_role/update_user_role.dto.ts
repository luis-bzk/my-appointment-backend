export class UpdateUserRoleDto {
  public id_user: number;
  public id_role: number;
  public id: number;

  constructor(id: number, id_user: number, id_role: number) {
    this.id = id;
    this.id_user = id_user;
    this.id_role = id_role;
  }

  static create(
    object: { [key: string]: any },
    params: { [key: string]: string },
  ): [string?, UpdateUserRoleDto?] {
    const { id_user, id_role } = object;
    const { id } = params;

    const parsedId = parseInt(id, 10);

    if (!id) return ['El ID del registro es necesario'];
    if (isNaN(parsedId)) return ['El ID del registro no es valido'];

    if (!id_user) return ['El ID del usuario es necesario'];
    if (isNaN(id_user)) return ['El ID del usuario no es valido'];

    if (!id_role) return ['El ID del rol es necesario'];
    if (isNaN(id_role)) return ['El ID del rol no es valido'];

    return [undefined, new UpdateUserRoleDto(parsedId, id_user, id_role)];
  }
}
