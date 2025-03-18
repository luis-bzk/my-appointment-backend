export class UpdateRoleDto {
  public id: number;
  public name: string;
  public description: string;

  constructor(id: number, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  static create(
    params: { [key: string]: string },
    object: { [key: string]: any },
  ): [string?, UpdateRoleDto?] {
    const { id } = params;
    const { name, description } = object;

    const parsedId = parseInt(id, 10);

    // make validation
    if (!id) return ['El ID de la provincia es requerido'];
    if (isNaN(parsedId)) return ['El ID de la provincia no es válido'];

    if (!name) return ['EL nombre del rol es requerido'];
    if (name.length > 100)
      return ['El nombre del rol no puede tener mas de 100 caracteres'];

    if (!description) return ['La descripción del rol es requerido'];
    if (description.length > 200)
      return ['La descripción del rol no puede tener mas de 200 caracteres'];

    return [
      undefined,
      new UpdateRoleDto(
        parsedId,
        name.toLowerCase(),
        description.toLowerCase(),
      ),
    ];
  }
}
