export class UpdateProvinceDto {
  public id: number;
  public name: string;
  public code: string;
  public prefix: string;
  public id_country: number;

  constructor(
    id: number,
    name: string,
    code: string,
    prefix: string,
    id_country: number,
  ) {
    this.id = id;
    this.name = name;
    this.code = code;
    this.prefix = prefix;
    this.id_country = id_country;
  }

  static create(
    params: { [key: string]: string },
    object: { [key: string]: any },
  ): [string?, UpdateProvinceDto?] {
    const { id } = params;
    const { name, code, prefix, id_country } = object;

    const parsedId = parseInt(id, 10);

    // make validation
    if (!id) return ['El ID de la provincia es requerido'];
    if (isNaN(parsedId)) return ['El ID de la provincia no es válido'];

    if (!name) return ['El nombre de la provincia es requerido'];
    if (name.length > 100)
      return ['El nombre de la provincia no puede tener mas de 100 caracteres'];

    if (!code) return ['El código de la provincia es requerido'];
    if (code.length > 10)
      return ['El código de la provincia no puede tener mas de 10 caracteres'];

    if (!prefix) return ['El prefijo de la provincia es requerido'];
    if (prefix.length > 10)
      return ['El prefijo de la provincia no puede tener mas de 10 caracteres'];

    if (!id_country) return ['El ID del país es requerido'];
    if (isNaN(id_country)) return ['El ID del país no es válido'];

    return [
      undefined,
      new UpdateProvinceDto(
        parsedId,
        name.toLowerCase(),
        code.toLowerCase(),
        prefix.toLowerCase(),
        id_country,
      ),
    ];
  }
}
