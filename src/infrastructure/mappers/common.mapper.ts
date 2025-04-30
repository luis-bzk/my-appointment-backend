import { TotalQuery } from '../../domain/entities';
import { TotalQueryDB } from '../../data/interfaces';

export class TotalQueryMapper {
  static mapTotalQuery(obj: TotalQueryDB | null): TotalQuery | null {
    if (!obj) return null;

    return new TotalQuery(parseInt(obj.total, 10));
  }
}
