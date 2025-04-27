import { BcryptAdapter } from '../../../config';
import { User } from '../../entities';
import { CustomError } from '../../errors';
import { AuthRepository } from '../../../adapters/repositories';
import { SignupUserDto, SignupUserSchema } from '../../schemas/auth';

type HashFunction = (password: string) => string;

export class SignUpUserUseCase {
  private readonly authRepository: AuthRepository;
  private readonly hashPassword: HashFunction;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
    this.hashPassword = BcryptAdapter.hash;
  }

  async execute(dto: SignupUserDto): Promise<User> {
    const { success, error, data: schema } = SignupUserSchema.safeParse(dto);
    if (!success) {
      const message = error.errors[0]?.message || 'Datos inválidos';
      throw CustomError.badRequest(message);
    }

    const userEmail = await this.authRepository.findUserByEmail(schema.email);
    if (userEmail) {
      throw CustomError.badRequest(
        'El email solicitado ya se encuentra registrado',
      );
    }

    const hashedPassword = this.hashPassword(schema.password);

    const userCreated = await this.authRepository.createUser({
      ...schema,
      password: hashedPassword,
    });
    if (!userCreated) {
      throw CustomError.internalServer('No se pudo crear el usuario');
    }

    return userCreated;
  }
}
