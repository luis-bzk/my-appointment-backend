import { GetPaymentMethodDto } from '../../dtos/payment_method';
import { PaymentMethod } from '../../entities';
import { PaymentMethodRepository } from '../../../adapters/repositories';

interface GetPaymentMethodUseCase {
  execute(getPaymentMethodDto: GetPaymentMethodDto): Promise<PaymentMethod>;
}

export class GetPaymentMethod implements GetPaymentMethodUseCase {
  private readonly paymentMethodRepository: PaymentMethodRepository;

  constructor(paymentMethodRepository: PaymentMethodRepository) {
    this.paymentMethodRepository = paymentMethodRepository;
  }

  async execute(
    getPaymentMethodDto: GetPaymentMethodDto,
  ): Promise<PaymentMethod> {
    return await this.paymentMethodRepository.get(getPaymentMethodDto);
  }
}
