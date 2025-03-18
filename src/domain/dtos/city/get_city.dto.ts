export class GetCityDto {
  public id: number;

  constructor(id: number) {
    this.id = id;
  }

  static create(params: { [key: string]: string }): [string?, GetCityDto?] {
    const { id } = params;
    const parsedId = parseInt(id, 10);

    // make validation
    if (!id) return ['El ID de la ciudad es requerido'];
    if (isNaN(parsedId)) return ['El ID de la ciudad no es válido'];

    return [undefined, new GetCityDto(parsedId)];
  }
}
