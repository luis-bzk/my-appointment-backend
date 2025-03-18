export class UpdateCityDto {
  public id: number;
  public name: string;
  public id_province: number;
  public id_country: number;

  constructor(
    id: number,
    name: string,
    id_province: number,
    id_country: number,
  ) {
    this.id = id;
    this.name = name;
    this.id_province = id_province;
    this.id_country = id_country;
  }

  static create(
    params: { [key: string]: string },
    object: { [key: string]: any },
  ): [string?, UpdateCityDto?] {
    const { id } = params;
    const { name, id_province, id_country } = object;
    const parsedId = parseInt(id, 10);

    // make validation
    if (!id) return ['El ID de la ciudad es requerido'];
    if (isNaN(parsedId)) return ['El ID de la ciudad no es válido'];

    if (!name) return ['El nombre de la ciudad es requerido'];
    if (name.length > 100)
      return ['El nombre de la ciudad no puede tener mas de 100 caracteres'];

    if (!id_province) return ['El ID de la provincia es requerido'];
    if (isNaN(id_province)) return ['El ID de la provincia no es válido'];

    if (!id_country) return ['El ID del país es requerido'];
    if (isNaN(id_country)) return ['El ID del país no es válido'];

    return [
      undefined,
      new UpdateCityDto(parsedId, name.toLowerCase(), id_province, id_country),
    ];
  }
}
