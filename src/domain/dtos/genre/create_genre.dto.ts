export class CreateGenreDto {
  public name: string;
  public description: string;
  public abbreviation: string;

  constructor(name: string, description: string, abbreviation: string) {
    this.name = name;
    this.description = description;
    this.abbreviation = abbreviation;
  }

  static create(body: { [key: string]: any }): [string?, CreateGenreDto?] {
    const { name, description, abbreviation } = body;

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
      new CreateGenreDto(
        name.toLowerCase(),
        description.toLowerCase(),
        abbreviation.toLowerCase(),
      ),
    ];
  }
}
