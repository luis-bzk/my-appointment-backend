import {
  CreatePaymentMethodDto,
  DeletePaymentMethodDto,
  GetAllPaymentMethodsDto,
  GetPaymentMethodDto,
  UpdatePaymentMethodDto,
} from '../../domain/dtos/payment_method';
import { PaymentMethod } from '../../domain/entities';

export abstract class PaymentMethodDataSource {
  abstract create(
    createPaymentMethodDto: CreatePaymentMethodDto,
  ): Promise<PaymentMethod>;

  abstract update(
    updatePaymentMethodDto: UpdatePaymentMethodDto,
  ): Promise<PaymentMethod>;

  abstract get(
    getPaymentMethodDto: GetPaymentMethodDto,
  ): Promise<PaymentMethod>;

  abstract getAll(
    getAllPaymentMethodsDto: GetAllPaymentMethodsDto,
  ): Promise<PaymentMethod[]>;

  abstract delete(
    deletePaymentMethodDto: DeletePaymentMethodDto,
  ): Promise<PaymentMethod>;
}
