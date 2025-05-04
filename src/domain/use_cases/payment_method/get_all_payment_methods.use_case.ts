import { GetAllPaymentMethodsDto } from '../../dtos/payment_method';
import { PaymentMethod } from '../../entities';
import { PaymentMethodRepository } from '../../../ports/repositories';

interface GetAllPaymentMethodUseCase {
  execute(
    getAllPaymentMethodsDto: GetAllPaymentMethodsDto,
  ): Promise<PaymentMethod[]>;
}

export class GetAllPaymentMethods implements GetAllPaymentMethodUseCase {
  private readonly paymentMethodRepository: PaymentMethodRepository;

  constructor(paymentMethodRepository: PaymentMethodRepository) {
    this.paymentMethodRepository = paymentMethodRepository;
  }

  async execute(
    getAllPaymentMethodsDto: GetAllPaymentMethodsDto,
  ): Promise<PaymentMethod[]> {
    return await this.paymentMethodRepository.getAll(getAllPaymentMethodsDto);
  }
}
