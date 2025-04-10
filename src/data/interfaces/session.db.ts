export interface SessionDB {
  ses_id: number;
  ses_jwt: string;
  id_user: number;
  ses_created_date: Date;
  ses_expires_at: Date;
  ses_ip: string;
  ses_user_agent: string;
}
