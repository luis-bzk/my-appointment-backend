import { User } from '../../entities';
import { UserRepository } from '../../../adapters/repositories';
import { CustomError } from '../../errors';
import { CreateUserDto, CreateUserSchema } from '../../schemas/user';

export class CreateUserUseCase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(dto: CreateUserDto): Promise<User> {
    const { success, error, data: schema } = CreateUserSchema.safeParse(dto);
    if (!success) {
      const message = error.errors[0]?.message || 'Datos inválidos';
      throw CustomError.badRequest(message);
    }

    const userEmail = await this.userRepository.findUserByEmail(schema.email);
    if (userEmail) {
      throw CustomError.conflict(
        'El email solicitado ya se encuentra registrado',
      );
    }

    const user = await this.userRepository.createNewUser(schema);
    if (!user) {
      throw CustomError.internalServer('No se pudo crear el usuario');
    }

    return user;
  }
}
