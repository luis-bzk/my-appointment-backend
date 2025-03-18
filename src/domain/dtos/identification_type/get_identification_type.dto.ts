export class GetIdentTypeDto {
  public id: number;

  constructor(id: number) {
    this.id = id;
  }

  static create(params: {
    [key: string]: string;
  }): [string?, GetIdentTypeDto?] {
    const { id } = params;
    const parsedId = parseInt(id, 10);

    if (!id) return ['El ID es requerido'];
    if (isNaN(parsedId)) return ['El ID no es valido'];

    return [undefined, new GetIdentTypeDto(parsedId)];
  }
}
