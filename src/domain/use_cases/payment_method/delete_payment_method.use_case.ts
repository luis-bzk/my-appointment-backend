import { DeletePaymentMethodDto } from '../../dtos/payment_method';
import { PaymentMethod } from '../../entities';
import { PaymentMethodRepository } from '../../repositories';

interface DeletePaymentMethodUseCase {
  execute(
    deletePaymentMethodDto: DeletePaymentMethodDto,
  ): Promise<PaymentMethod>;
}

export class DeletePaymentMethod implements DeletePaymentMethodUseCase {
  private readonly paymentMethodRepository: PaymentMethodRepository;

  constructor(paymentMethodRepository: PaymentMethodRepository) {
    this.paymentMethodRepository = paymentMethodRepository;
  }

  async execute(
    deletePaymentMethodDto: DeletePaymentMethodDto,
  ): Promise<PaymentMethod> {
    return await this.paymentMethodRepository.delete(deletePaymentMethodDto);
  }
}
