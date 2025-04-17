import { User } from '../../entities';
import { DeleteUserDto } from '../../dtos/user';
import { UserRepository } from '../../../adapters/repositories';
import { CustomError } from '../../errors';

interface DeleteUserUseCase {
  execute(deleteUserDto: DeleteUserDto): Promise<User>;
}

export class DeleteUser implements DeleteUserUseCase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(deleteUserDto: DeleteUserDto): Promise<User> {
    const user = await this.userRepository.findUserById(deleteUserDto.id);
    if (!user) {
      throw CustomError.notFound('No se ha encontrado el usuario a eliminar');
    }

    const deletedUser = await this.userRepository.deleteUser(deleteUserDto.id);
    if (!deletedUser) {
      throw CustomError.internalServer('No se ha podido eliminar el usuario');
    }

    return { ...deletedUser, password: '' };
  }
}
