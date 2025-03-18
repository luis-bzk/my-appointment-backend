export class DeleteCountryDto {
  public id: number;

  constructor(id: number) {
    this.id = id;
  }

  static create(params: {
    [key: string]: string;
  }): [string?, DeleteCountryDto?] {
    const { id } = params;
    const parsedId = parseInt(id, 10);

    if (!id) return ['El ID del país es requerido'];
    if (isNaN(parsedId)) return ['El ID del país no es válido'];

    return [undefined, new DeleteCountryDto(parsedId)];
  }
}
