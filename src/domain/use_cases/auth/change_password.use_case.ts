import { User } from '../../entities';
import { ChangePasswordDto } from '../../dtos/auth';
import { AuthRepository } from '../../repositories';

interface ChangePasswordUseCase {
  execute(changePasswordDto: ChangePasswordDto): Promise<User>;
}

export class ChangePassword implements ChangePasswordUseCase {
  private readonly authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(changePasswordDto: ChangePasswordDto): Promise<User> {
    return this.authRepository.changePassword(changePasswordDto);
  }
}
