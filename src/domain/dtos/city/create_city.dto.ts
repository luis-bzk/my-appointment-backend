export class CreateCityDto {
  public name: string;
  public id_province: number;
  public id_country: number;

  constructor(name: string, id_province: number, id_country: number) {
    this.name = name;
    this.id_province = id_province;
    this.id_country = id_country;
  }

  static create(object: { [key: string]: any }): [string?, CreateCityDto?] {
    const { name, id_province, id_country } = object;

    // make validation
    if (!name) return ['El nombre de la ciudad es requerido'];
    if (name.length > 100)
      return ['El nombre de la ciudad no puede tener mas de 100 caracteres'];

    if (!id_province) return ['El ID de la provincia es requerido'];
    if (isNaN(id_province)) return ['El ID de la provincia no es válido'];

    if (!id_country) return ['El ID del país es requerido'];
    if (isNaN(id_country)) return ['El ID del país no es válido'];

    return [
      undefined,
      new CreateCityDto(name.toLowerCase(), id_province, id_country),
    ];
  }
}
