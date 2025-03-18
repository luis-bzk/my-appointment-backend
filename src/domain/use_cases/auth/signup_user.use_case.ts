import { SignupUserDto } from '../../dtos/auth';
import { User } from '../../entities';
import { AuthRepository } from '../../repositories';

interface SignupUserUseCase {
  execute(signupUserDto: SignupUserDto): Promise<User>;
}

export class SignUpUser implements SignupUserUseCase {
  private readonly authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(signupUserDto: SignupUserDto): Promise<User> {
    return await this.authRepository.signup(signupUserDto);
  }
}
