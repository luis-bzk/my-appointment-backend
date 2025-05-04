import { CreatePaymentMethodDto } from '../../dtos/payment_method';
import { PaymentMethod } from '../../entities';
import { PaymentMethodRepository } from '../../../ports/repositories';

interface CreatePaymentMethodUseCase {
  execute(
    createPaymentMethodDto: CreatePaymentMethodDto,
  ): Promise<PaymentMethod>;
}

export class CreatePaymentMethod implements CreatePaymentMethodUseCase {
  private readonly paymentMethodRepository: PaymentMethodRepository;

  constructor(paymentMethodRepository: PaymentMethodRepository) {
    this.paymentMethodRepository = paymentMethodRepository;
  }

  async execute(
    createPaymentMethodDto: CreatePaymentMethodDto,
  ): Promise<PaymentMethod> {
    return await this.paymentMethodRepository.create(createPaymentMethodDto);
  }
}
