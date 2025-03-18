export class CreateUserRoleDto {
  public id_user: number;
  public id_role: number;

  constructor(id_user: number, id_role: number) {
    this.id_user = id_user;
    this.id_role = id_role;
  }

  static create(object: { [key: string]: any }): [string?, CreateUserRoleDto?] {
    const { id_user, id_role } = object;

    if (!id_user) return ['El ID del usuario es necesario'];
    if (isNaN(id_user)) return ['El ID del usuario no es valido'];

    if (!id_role) return ['El ID del rol es necesario'];
    if (isNaN(id_role)) return ['El ID del rol no es valido'];

    return [undefined, new CreateUserRoleDto(id_user, id_role)];
  }
}
