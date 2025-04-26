import { User } from '../../entities';
import { AuthRepository } from '../../../adapters/repositories';
import { CustomError } from '../../errors';
import { BcryptAdapter } from '../../../config';
import { ChangePasswordDto, ChangePasswordSchema } from '../../schemas/auth';

type HashFunction = (password: string) => string;

export class ChangePasswordUseCase {
  private readonly authRepository: AuthRepository;
  private readonly hashPassword: HashFunction;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
    this.hashPassword = BcryptAdapter.hash;
  }

  async execute(dto: ChangePasswordDto): Promise<User> {
    const {
      success,
      error,
      data: schema,
    } = ChangePasswordSchema.safeParse(dto);
    if (!success) {
      const message = error.errors[0]?.message || 'Datos inválidos';
      throw CustomError.badRequest(message);
    }

    const userToken = await this.authRepository.findUserByToken(schema.token);
    if (!userToken) {
      throw CustomError.notFound(
        'No se ha encontrado un usuario asociado a este token',
      );
    }
    const hashedPassword = this.hashPassword(schema.password);

    const userUpdated = await this.authRepository.changePassword({
      password: hashedPassword,
      token: schema.token,
    });
    if (!userUpdated) {
      throw CustomError.internalServer(
        'No se ha podido actualizar la contraseña del usuario',
      );
    }
    return { ...userUpdated, password: '' };
  }
}
