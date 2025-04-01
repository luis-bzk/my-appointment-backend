export interface NotificationDB {
  not_id: number;
  not_message: string;
  not_is_read: boolean;
  not_created_date: Date;
  not_record_status: string;
  id_notification_type: number;
  id_user: number;
}
