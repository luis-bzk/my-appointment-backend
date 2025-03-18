export class UpdateGenreDto {
  public id: number;
  public name: string;
  public description: string;
  public abbreviation: string;

  constructor(
    id: number,
    name: string,
    description: string,
    abbreviation: string,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.abbreviation = abbreviation;
  }

  static create(
    params: { [key: string]: string },
    body: { [key: string]: any },
  ): [string?, UpdateGenreDto?] {
    const { id } = params;
    const { name, description, abbreviation } = body;

    const parsedId = parseInt(id, 10);

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

    return [
      undefined,
      new UpdateGenreDto(
        parsedId,
        name.toLowerCase(),
        description.toLowerCase(),
        abbreviation.toLowerCase(),
      ),
    ];
  }
}
