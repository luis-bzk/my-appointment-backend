export class DeleteNotificationTypeDto {
  public id: number;

  constructor(id: number) {
    this.id = id;
  }

  static create(params: {
    [key: string]: string;
  }): [string?, DeleteNotificationTypeDto?] {
    const { id } = params;
    const parsedId = parseInt(id, 10);

    if (!id) return ['El ID es requerido'];
    if (isNaN(parsedId)) return ['El ID no tiene un formato valido'];

    return [undefined, new DeleteNotificationTypeDto(parsedId)];
  }
}
