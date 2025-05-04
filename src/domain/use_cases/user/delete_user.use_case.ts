import { User } from '../../entities';
import { UserRepository } from '../../../ports/repositories';
import { CustomError } from '../../errors';
import { UserIdDto, UserIdPortDto, UserIdSchema } from '../../schemas/user';

export class DeleteUserUseCase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(dto: UserIdPortDto): Promise<User> {
    const { success, error, data: schema } = UserIdSchema.safeParse(dto);
    if (!success) {
      const message = error.errors[0]?.message || 'Parámetros inválidos';
      throw CustomError.badRequest(message);
    }

    const parsedSchema: UserIdDto = {
      ...schema,
      id: parseInt(schema.id, 10),
    };

    const user = await this.userRepository.findUserById(parsedSchema.id);
    if (!user) {
      throw CustomError.notFound('No se ha encontrado el usuario a eliminar');
    }

    const deletedUser = await this.userRepository.deleteUser(parsedSchema.id);
    if (!deletedUser) {
      throw CustomError.internalServer('No se ha podido eliminar el usuario');
    }

    return deletedUser;
  }
}
