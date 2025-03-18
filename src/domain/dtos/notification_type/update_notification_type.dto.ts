export class UpdateNotificationTypeDto {
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
    body: { [key: string]: any },
  ): [string?, UpdateNotificationTypeDto?] {
    const { id } = params;
    const { name, description } = body;

    const parsedId = parseInt(id, 10);

    if (!id) return ['El ID es requerido'];
    if (isNaN(parsedId)) return ['El ID no tiene un formato valido'];

    if (!name) return ['EL nombre es requerido'];
    if (name.length > 100)
      return ['El nombre no puede tener mas de 100 caracteres'];

    if (!description) return ['La descripción es requerida'];
    if (description.length > 300)
      return ['La descripción no puede tener mas de 300 caracteres'];

    return [
      undefined,
      new UpdateNotificationTypeDto(
        parsedId,
        name.toLowerCase(),
        description.toLowerCase(),
      ),
    ];
  }
}
