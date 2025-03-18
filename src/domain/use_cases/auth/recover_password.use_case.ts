import { User } from '../../entities';
import { AuthRepository } from '../../repositories';
import { RecoverPasswordDto } from '../../dtos/auth';

interface RecoverPasswordUseCase {
  execute(recoverPasswordDto: RecoverPasswordDto): Promise<User>;
}

export class RecoverPassword implements RecoverPasswordUseCase {
  private readonly authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(recoverPasswordDto: RecoverPasswordDto): Promise<User> {
    return this.authRepository.recoverPassword(recoverPasswordDto);
  }
}
