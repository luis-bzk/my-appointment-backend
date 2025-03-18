import { User } from '../../entities';
import { RequireAuthDto } from '../../dtos/auth';
import { AuthRepository } from '../../repositories';

interface RequireAuthUseCase {
  execute(requireAuthDto: RequireAuthDto): Promise<User>;
}

export class RequireAuth implements RequireAuthUseCase {
  private readonly authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(requireAuthDto: RequireAuthDto): Promise<User> {
    return await this.authRepository.requireAuth(requireAuthDto);
  }
}
