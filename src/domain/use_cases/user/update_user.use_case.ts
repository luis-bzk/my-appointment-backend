import { UpdateUserDto } from '../../dtos/user';
import { User } from '../../entities';
import { UserRepository } from '../../repositories';

interface UpdateUserUseCase {
  execute(updateUserDto: UpdateUserDto): Promise<User>;
}

export class UpdateUser implements UpdateUserUseCase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(updateUserDto: UpdateUserDto): Promise<User> {
    return this.userRepository.update(updateUserDto);
  }
}
