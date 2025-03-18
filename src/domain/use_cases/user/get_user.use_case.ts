import { User } from '../../entities';
import { GetUserDto } from '../../dtos/user';
import { UserRepository } from '../../repositories';

interface GetUserUseCase {
  execute(getUserDto: GetUserDto): Promise<User>;
}

export class GetUser implements GetUserUseCase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(getUserDto: GetUserDto): Promise<User> {
    return this.userRepository.get(getUserDto);
  }
}
