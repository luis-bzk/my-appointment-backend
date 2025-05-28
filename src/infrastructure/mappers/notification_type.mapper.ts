import { NotificationType } from '../../domain/entities';
import { NotificationTypeDB } from '../../data/interfaces';

export class NotificationTypeMapper {
  static entityFromObject(
    obj: NotificationTypeDB | null,
  ): NotificationType | null {
    if (!obj) return null;

    return new NotificationType(
      obj.nty_id,
      obj.nty_name,
      obj.nty_description,
      obj.nty_created_date,
      obj.nty_record_status,
    );
  }

  static entitiesFromArray(objs: NotificationTypeDB[]): NotificationType[] {
    return objs
      .filter((obj): obj is NotificationTypeDB => obj !== null)
      .map((obj) => this.entityFromObject(obj)!);
  }
}
