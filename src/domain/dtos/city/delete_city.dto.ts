export class DeleteCityDto {
  public id: number;

  constructor(id: number) {
    this.id = id;
  }

  static create(params: { [key: string]: string }): [string?, DeleteCityDto?] {
    const { id } = params;
    const parsedId = parseInt(id, 10);

    // make validation
    if (!id) return ['El ID de la ciudad es requerido'];
    if (isNaN(parsedId)) return ['El ID de la ciudad no es válido'];

    return [undefined, new DeleteCityDto(parsedId)];
  }
}
