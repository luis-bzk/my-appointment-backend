import { BcryptAdapter } from '../../../config';
import { SignupUserDto } from '../../dtos/auth';
import { User } from '../../entities';
import { CustomError } from '../../errors';
import { AuthRepository } from '../../repositories';

type HashFunction = (password: string) => string;

interface SignupUserUseCase {
  execute(signupUserDto: SignupUserDto): Promise<User>;
}

export class SignUpUser implements SignupUserUseCase {
  private readonly authRepository: AuthRepository;
  private readonly hashPassword: HashFunction;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
    this.hashPassword = BcryptAdapter.hash;
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

    const hashedPassword = this.hashPassword(signupUserDto.password);
    const updatedDto: SignupUserDto = new SignupUserDto(
      signupUserDto.name,
      signupUserDto.last_name,
      signupUserDto.email,
      hashedPassword,
    );

    const userCreated = await this.authRepository.createUser(updatedDto);
    if (!userCreated) {
      throw CustomError.internalServer('No se pudo crear el usuario');
    }

    return { ...userCreated, password: '' };
  }
}
