import { Pool } from 'pg';
import { PaymentMethodDataSource } from '../../ports/data_sources';
import { PostgresDatabase } from '../../data';
import {
  CreatePaymentMethodDto,
  DeletePaymentMethodDto,
  GetAllPaymentMethodsDto,
  GetPaymentMethodDto,
  UpdatePaymentMethodDto,
} from '../../domain/dtos/payment_method';
import { CustomError } from '../../domain/errors';
import { PaymentMethod } from '../../domain/entities';
import { RECORD_STATUS } from '../../shared/constants';
import { PaymentMethodDB } from '../../data/interfaces';
import { PaymentMethodMapper } from '../mappers/payment_method.mapper';

export class PaymentMethodDataSourceImpl implements PaymentMethodDataSource {
  private pool: Pool;

  constructor() {
    this.pool = PostgresDatabase.getPool();
  }

  async create(
    createPaymentMethodDto: CreatePaymentMethodDto,
  ): Promise<PaymentMethod> {
    const { name, description } = createPaymentMethodDto;

    try {
      // search by name
      const paymentMethod = await this.pool.query<PaymentMethodDB>(
        `select
          cpm.pme_id,
          cpm.pme_record_status
        from
          core.core_payment_method cpm
        where
          lower(cpm.pme_name) = $1
          and cpm.pme_record_status = $2;`,
        [name, RECORD_STATUS.AVAILABLE],
      );
      if (paymentMethod.rows.length > 0) {
        throw CustomError.conflict(
          'Ya existe un método de pago con el mismo nombre',
        );
      }

      // create
      const newPaymentMethod = await this.pool.query<PaymentMethodDB>(
        `insert into
          core.core_payment_method (
            pme_name,
            pme_description,
            pme_created_date,
            pme_record_status
          )
        values
          ($1, $2, $3, $4) returning *;`,
        [name, description, new Date(), RECORD_STATUS.AVAILABLE],
      );

      return PaymentMethodMapper.entityFromObject(newPaymentMethod.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al crear');
    }
  }

  async update(
    updatePaymentMethodDto: UpdatePaymentMethodDto,
  ): Promise<PaymentMethod> {
    const { id, name, description } = updatePaymentMethodDto;
    try {
      // find by id
      const paymentMethod = await this.pool.query<PaymentMethodDB>(
        `select
          cpm.pme_id,
          cpm.pme_record_status
        from
          core.core_payment_method cpm
        where
          cpm.pme_id = $1
          and cpm.pme_record_status = $2;`,
        [id, RECORD_STATUS.AVAILABLE],
      );
      if (paymentMethod.rows.length === 0) {
        throw CustomError.notFound('No existe el método de pago');
      }

      // find by name other id
      const otherPaymentMethod = await this.pool.query<PaymentMethodDB>(
        `select
          cpm.pme_id,
          cpm.pme_record_status
        from
          core.core_payment_method cpm
        where
          lower(cpm.pme_name) = $1
          and cpm.pme_id = $2
          and cpm.pme_record_status = $3;`,
        [name, id, RECORD_STATUS.AVAILABLE],
      );
      if (otherPaymentMethod.rows.length > 0) {
        throw CustomError.conflict(
          'Ya existe un método de pago con el mismo nombre',
        );
      }

      // update
      const updatedPaymentMethod = await this.pool.query<PaymentMethodDB>(
        `update core.core_payment_method
        set
          pme_name = $1,
          pme_description = $2
        where
          pme_id = $3
        returning *;`,
        [name, description, id],
      );

      return PaymentMethodMapper.entityFromObject(updatedPaymentMethod.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al actualizar');
    }
  }

  async get(getPaymentMethodDto: GetPaymentMethodDto): Promise<PaymentMethod> {
    const { id } = getPaymentMethodDto;

    try {
      const paymentMethod = await this.pool.query<PaymentMethodDB>(
        `select
          cpm.pme_id,
          cpm.pme_name,
          cpm.pme_description,
          cpm.pme_created_date,
          cpm.pme_record_status
        from
          core.core_payment_method cpm
        where
          cpm.pme_id = $1
          and cpm.pme_record_status = $2;`,
        [id, RECORD_STATUS.AVAILABLE],
      );

      if (paymentMethod.rows.length === 0) {
        throw CustomError.notFound('No existe el método de pago');
      }

      return PaymentMethodMapper.entityFromObject(paymentMethod.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al obtener');
    }
  }

  async getAll(
    getAllPaymentMethodsDto: GetAllPaymentMethodsDto,
  ): Promise<PaymentMethod[]> {
    const { limit, offset } = getAllPaymentMethodsDto;
    try {
      const registers = await this.pool.query<PaymentMethodDB>(
        `select
          cpm.pme_id,
          cpm.pme_name,
          cpm.pme_description,
          cpm.pme_created_date,
          cpm.pme_record_status
        from
          core.core_payment_method cpm
        where
          cpm.pme_record_status = $1
        order by
          cpm.pme_name
        limit $2 offset $3;`,
        [RECORD_STATUS.AVAILABLE, limit, offset],
      );

      return PaymentMethodMapper.entitiesFromArray(registers.rows);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer(
        'Error en el Data Source al obtener todos',
      );
    }
  }

  async delete(
    deletePaymentMethodDto: DeletePaymentMethodDto,
  ): Promise<PaymentMethod> {
    const { id } = deletePaymentMethodDto;
    try {
      const paymentMethod = await this.pool.query<PaymentMethodDB>(
        `select
          cpm.pme_id,
          cpm.pme_record_status
        from
          core.core_payment_method cpm
        where
          cpm.pme_id = $1
          and cpm.pme_record_status = $2;`,
        [id, RECORD_STATUS.AVAILABLE],
      );
      if (paymentMethod.rows.length === 0) {
        throw CustomError.notFound('No existe el método de pago');
      }

      const deletedRegister = await this.pool.query<PaymentMethodDB>(
        `delete from core.core_payment_method
        where
          pme_id = $1
        returning *;`,
        [id],
      );

      return PaymentMethodMapper.entityFromObject(deletedRegister.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al eliminar');
    }
  }
}
