export class UpdateCountryDto {
  public id: number;
  public name: string;
  public code: string;
  public prefix: string;

  constructor(id: number, name: string, code: string, prefix: string) {
    this.id = id;
    this.name = name;
    this.code = code;
    this.prefix = prefix;
  }

  static create(
    params: { [key: string]: string },
    object: { [key: string]: any },
  ): [string?, UpdateCountryDto?] {
    const { id } = params;
    const { name, code, prefix } = object;
    const parsedId = parseInt(id, 10);

    // make validation
    if (!id) return ['El ID del país es requerido'];
    if (isNaN(parsedId)) return ['El ID del país es requerido'];

    if (!name) return ['El nombre del país es requerido'];
    if (name.length > 100)
      return ['El nombre del país no puede tener mas de 100 caracteres'];

    if (!code) return ['El código del país es requerido'];
    if (code.length > 10)
      return ['El código del país no puede tener mas de 10 caracteres'];

    if (!prefix) return ['El prefijo del país es requerido'];
    if (prefix.length > 10)
      return ['El prefijo del país no puede tener mas de 10 caracteres'];

    return [
      undefined,
      new UpdateCountryDto(
        parsedId,
        name.toLowerCase(),
        code.toLowerCase(),
        prefix.toLowerCase(),
      ),
    ];
  }
}
