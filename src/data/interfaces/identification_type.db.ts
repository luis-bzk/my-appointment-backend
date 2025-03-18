import { CountryDB } from './country.db';

export interface IdentificationTypeDB {
  ity_id: number;
  ity_name: string;
  ity_description: string;
  ity_abbreviation: string;
  ity_created_date: Date;
  ity_record_status: string;
  id_country: number;
}

export interface IdentificationTypeDetailDB
  extends IdentificationTypeDB,
    CountryDB {}
