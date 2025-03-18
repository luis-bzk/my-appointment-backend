export class UpdateIdentTypeDto {
  public id: number;
  public name: string;
  public description: string;
  public abbreviation: string;
  public id_country: number;

  constructor(
    id: number,
    name: string,
    description: string,
    abbreviation: string,
    id_country: number,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.abbreviation = abbreviation;
    this.id_country = id_country;
  }

  static create(
    params: { [key: string]: string },
    body: { [key: string]: any },
  ): [string?, UpdateIdentTypeDto?] {
    const { id } = params;
    const { name, description, abbreviation, id_country } = body;
    const parsedId = parseInt(id, 10);

    // validations
    if (!id) return ['El ID es requerido'];
    if (isNaN(parsedId)) return ['El ID no es valido'];

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
      new UpdateIdentTypeDto(
        parsedId,
        name.toLowerCase(),
        description.toLowerCase(),
        abbreviation.toLowerCase(),
        id_country,
      ),
    ];
  }
}
