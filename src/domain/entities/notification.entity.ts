export class Notification {
  constructor(
    public id: number,
    public message: string,
    public is_read: boolean,
    public created_date: Date,
    public record_status: string,
    public id_notification_type: number,
    public id_user: number,
  ) {}
}
