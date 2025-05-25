import { IdentificationType } from '../../domain/entities';
import { IdentificationTypeDB } from '../../data/interfaces/identification_type.db';

export class IdentificationTypeMapper {
  static entityFromObject(
    obj: IdentificationTypeDB | null,
  ): IdentificationType | null {
    if (!obj) return null;

    return new IdentificationType(
      obj.ity_id,
      obj.ity_name,
      obj.ity_description,
      obj.ity_abbreviation,
      obj.ity_created_date,
      obj.ity_record_status,
      obj.id_country,
    );
  }

  static entitiesFromArray(objs: IdentificationTypeDB[]): IdentificationType[] {
    return objs
      .filter((obj): obj is IdentificationTypeDB => obj !== null)
      .map((identType) => this.entityFromObject(identType)!);
  }
}
