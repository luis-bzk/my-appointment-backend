import {
  CreatePaymentMethodDto,
  DeletePaymentMethodDto,
  GetAllPaymentMethodsDto,
  GetPaymentMethodDto,
  UpdatePaymentMethodDto,
} from '../../domain/dtos/payment_method';
import { PaymentMethod } from '../../domain/entities';
import { PaymentMethodDataSource } from '../../adapters/data_sources';
import { PaymentMethodRepository } from '../../adapters/repositories';

export class PaymentMethodRepositoryImpl implements PaymentMethodRepository {
  private readonly paymentMethodDataSource: PaymentMethodDataSource;

  constructor(paymentMethodDataSource: PaymentMethodDataSource) {
    this.paymentMethodDataSource = paymentMethodDataSource;
  }

  create(
    createPaymentMethodDto: CreatePaymentMethodDto,
  ): Promise<PaymentMethod> {
    return this.paymentMethodDataSource.create(createPaymentMethodDto);
  }

  update(
    updatePaymentMethodDto: UpdatePaymentMethodDto,
  ): Promise<PaymentMethod> {
    return this.paymentMethodDataSource.update(updatePaymentMethodDto);
  }

  get(getPaymentMethodDto: GetPaymentMethodDto): Promise<PaymentMethod> {
    return this.paymentMethodDataSource.get(getPaymentMethodDto);
  }

  getAll(
    getAllPaymentMethodsDto: GetAllPaymentMethodsDto,
  ): Promise<PaymentMethod[]> {
    return this.paymentMethodDataSource.getAll(getAllPaymentMethodsDto);
  }

  delete(
    deletePaymentMethodDto: DeletePaymentMethodDto,
  ): Promise<PaymentMethod> {
    return this.paymentMethodDataSource.delete(deletePaymentMethodDto);
  }
}
