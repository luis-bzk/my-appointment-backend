import { User } from '../../entities';
import { UserRepository } from '../../../adapters/repositories';
import { CustomError } from '../../errors';
import { DeleteUserParamsDto, DeleteUserSchema } from '../../schemas/user';

export class DeleteUserUseCase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(params: DeleteUserParamsDto): Promise<User> {
    const { success, error, data: schema } = DeleteUserSchema.safeParse(params);

    if (!success) {
      const message = error.errors[0]?.message || 'Parámetros inválidos';
      throw CustomError.badRequest(message);
    }

    const user = await this.userRepository.findUserById(schema.id);
    if (!user) {
      throw CustomError.notFound('No se ha encontrado el usuario a eliminar');
    }

    const deletedUser = await this.userRepository.deleteUser(schema.id);
    if (!deletedUser) {
      throw CustomError.internalServer('No se ha podido eliminar el usuario');
    }

    return { ...deletedUser, password: '' };
  }
}
