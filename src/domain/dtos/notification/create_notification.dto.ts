export class CreateNotificationDto {
  public id_user: number;
  public message: string;
  public id_notification_type: number;

  constructor(id_user: number, message: string, id_notification_type: number) {
    this.id_user = id_user;
    this.message = message;
    this.id_notification_type = id_notification_type;
  }

  static create(object: {
    [key: string]: any;
  }): [string?, CreateNotificationDto?] {
    const { id_user, message, id_notification_type } = object;

    if (!id_user) return ['El ID del usuario es necesario'];
    if (isNaN(id_user)) return ['El ID del usuario no es valido'];

    if (!message) return ['El mensaje es necesario'];
    if (message.length > 1000)
      return ['El mensaje no puede tener mas de 1000 caracteres'];

    if (!id_notification_type)
      return ['El ID del tipo de notificación es necesario'];
    if (isNaN(id_notification_type))
      return ['El ID del tipo de notificación no es valido'];

    return [
      undefined,
      new CreateNotificationDto(
        id_user,
        message.toLowerCase(),
        id_notification_type,
      ),
    ];
  }
}
