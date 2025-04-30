import { AuthRepository } from '../../../adapters/repositories';
import { User } from '../../entities';
import { CustomError } from '../../errors';
import { BcryptAdapter } from '../../../config';
import { LoginUserDto, LoginUserSchema } from '../../schemas/auth';

type CompareFunction = (password: string, hashed: string) => boolean;

export class LoginUserUseCase {
  private readonly authRepository: AuthRepository;
  private readonly comparePassword: CompareFunction;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
    this.comparePassword = BcryptAdapter.compare;
  }

  async execute(dto: LoginUserDto): Promise<User> {
    const { success, error, data: schema } = LoginUserSchema.safeParse(dto);
    if (!success) {
      const message = error.errors[0]?.message || 'Datos inválidos';
      throw CustomError.badRequest(message);
    }

    const user = await this.authRepository.findUserByEmailComplete(
      schema.email,
    );
    if (!user) {
      throw CustomError.badRequest('El usuario o contraseña es incorrecto');
    }
    if (user.token) {
      throw CustomError.forbidden('El usuario no se encuentra verificado');
    }
    console.log({
      password: schema.password,
      hashed: user.password,
    });
    const isMatching = this.comparePassword(schema.password, user.password);
    if (!isMatching) {
      throw CustomError.badRequest('El usuario o contraseña es incorrecto');
    }

    return user;
  }
}
