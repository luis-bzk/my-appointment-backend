import { User } from '../../entities';
import { CheckTokenDto } from '../../dtos/auth';
import { AuthRepository } from '../../repositories';

interface CheckTokenUseCase {
  execute(checkTokenDto: CheckTokenDto): Promise<User>;
}

export class CheckToken implements CheckTokenUseCase {
  private readonly authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(checkTokenDto: CheckTokenDto): Promise<User> {
    return await this.authRepository.checkToken(checkTokenDto);
  }
}
