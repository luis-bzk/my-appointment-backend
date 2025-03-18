export interface PaymentMethodDB {
  pme_id: number;
  pme_name: string;
  pme_description: string;
  pme_created_date: Date;
  pme_record_status: string;
}
