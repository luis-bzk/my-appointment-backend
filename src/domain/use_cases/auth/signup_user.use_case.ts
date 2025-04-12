import { SignupUserDto } from '../../dtos/auth';
import { User } from '../../entities';
import { CustomError } from '../../errors';
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
    const userEmail = await this.authRepository.findUserByEmail(
      signupUserDto.email,
    );
    if (userEmail) {
      throw CustomError.badRequest(
        'El email solicitado ya se encuentra registrado',
      );
    }

    const userCreated = await this.authRepository.createUser(signupUserDto);
    if (!userCreated) {
      throw CustomError.internalServer('No se pudo crear el usuario');
    }

    return { ...userCreated, password: '' };
  }
}
