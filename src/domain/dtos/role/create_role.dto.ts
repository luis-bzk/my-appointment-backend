export class CreateRoleDto {
  public name: string;
  public description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }

  static create(object: { [key: string]: any }): [string?, CreateRoleDto?] {
    const { name, description } = object;

    if (!name) return ['EL nombre del rol es requerido'];
    if (name.length > 100)
      return ['El nombre del rol no puede tener mas de 100 caracteres'];

    if (!description) return ['La descripción del rol es requerido'];
    if (description.length > 200)
      return ['La descripción del rol no puede tener mas de 200 caracteres'];

    return [
      undefined,
      new CreateRoleDto(name.toLowerCase(), description.toLowerCase()),
    ];
  }
}
