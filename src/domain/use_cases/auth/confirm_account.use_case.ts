import { User } from '../../entities';
import { AuthRepository } from '../../repositories';
import { ConfirmAccountDto } from '../../dtos/auth';

interface ConfirmAccountUseCase {
  execute(confirmAccountDto: ConfirmAccountDto): Promise<User>;
}

export class ConfirmAccount implements ConfirmAccountUseCase {
  private readonly authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(confirmAccountDto: ConfirmAccountDto): Promise<User> {
    return await this.authRepository.confirmAccount(confirmAccountDto);
  }
}
