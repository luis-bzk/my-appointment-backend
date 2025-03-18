export class CreateIdentTypeDto {
  public name: string;
  public description: string;
  public abbreviation: string;
  public id_country: number;

  constructor(
    name: string,
    description: string,
    abbreviation: string,
    id_country: number,
  ) {
    this.name = name;
    this.description = description;
    this.abbreviation = abbreviation;
    this.id_country = id_country;
  }

  static create(body: { [key: string]: any }): [string?, CreateIdentTypeDto?] {
    const { name, description, abbreviation, id_country } = body;

    if (!name) return ['El nombre es requerido'];
    if (name.length > 50)
      return ['El nombre no puede tener mas de 50 caracteres'];

    if (!description) return ['La descripción es requerida'];
    if (description.length > 100)
      return ['La descripción no puede tener mas de 100 caracteres'];

    if (!abbreviation) return ['La abreviación es requerida'];
    if (abbreviation.length > 10)
      return ['La abreviación no puede tener mas de 10 caracteres'];

    if (!id_country) return ['El ID del país es requerido'];
    if (isNaN(id_country)) return ['El ID del país no es valido'];

    return [
      undefined,
      new CreateIdentTypeDto(
        name.toLowerCase(),
        description.toLowerCase(),
        abbreviation.toLowerCase(),
        id_country,
      ),
    ];
  }
}
