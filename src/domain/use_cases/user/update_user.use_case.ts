import { UpdateUserDto } from '../../dtos/user';
import { User } from '../../entities';
import { CustomError } from '../../errors';
import { UserRepository } from '../../../adapters/repositories';

interface UpdateUserUseCase {
  execute(updateUserDto: UpdateUserDto): Promise<User>;
}

export class UpdateUser implements UpdateUserUseCase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(updateUserDto: UpdateUserDto): Promise<User> {
    const userId = await this.userRepository.findUserById(updateUserDto.id);
    if (!userId) {
      throw CustomError.notFound('No se ha encontrado el usuario a actualizar');
    }

    const userEmailId = await this.userRepository.findUserByEmailId(
      updateUserDto.id,
      updateUserDto.email,
    );
    if (userEmailId) {
      throw CustomError.conflict('Ya existe un usuario con el email ingresado');
    }

    const updatedEmail = await this.userRepository.updateUser(updateUserDto);
    if (!updatedEmail) {
      throw CustomError.conflict('No se pudo actualizar el usuario');
    }

    return { ...updatedEmail, password: '' };
  }
}
