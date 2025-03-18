import { User } from '../../entities';
import { DeleteUserDto } from '../../dtos/user';
import { UserRepository } from '../../repositories';

interface DeleteUserUseCase {
  execute(deleteUserDto: DeleteUserDto): Promise<User>;
}

export class DeleteUser implements DeleteUserUseCase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(deleteUserDto: DeleteUserDto): Promise<User> {
    return this.userRepository.delete(deleteUserDto);
  }
}
