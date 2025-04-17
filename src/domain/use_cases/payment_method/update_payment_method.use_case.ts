import { UpdatePaymentMethodDto } from '../../dtos/payment_method';
import { PaymentMethod } from '../../entities';
import { PaymentMethodRepository } from '../../../adapters/repositories';

interface UpdatePaymentMethodUseCase {
  execute(
    updatePaymentMethodDto: UpdatePaymentMethodDto,
  ): Promise<PaymentMethod>;
}

export class UpdatePaymentMethod implements UpdatePaymentMethodUseCase {
  private readonly paymentMethodRepository: PaymentMethodRepository;

  constructor(paymentMethodRepository: PaymentMethodRepository) {
    this.paymentMethodRepository = paymentMethodRepository;
  }

  async execute(
    updatePaymentMethodDto: UpdatePaymentMethodDto,
  ): Promise<PaymentMethod> {
    return await this.paymentMethodRepository.update(updatePaymentMethodDto);
  }
}
