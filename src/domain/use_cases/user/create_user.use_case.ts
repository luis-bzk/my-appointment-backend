import { User } from '../../entities';
import { CreateUserDto } from '../../dtos/user';
import { UserRepository } from '../../repositories';

interface CreateUserUseCase {
  execute(createUserDto: CreateUserDto): Promise<User>;
}

export class CreateUser implements CreateUserUseCase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.create(createUserDto);
  }
}
