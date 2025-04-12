import { User } from '../../entities';
import { GetAllUsersDto } from '../../dtos/user';
import { UserRepository } from '../../repositories';

interface GetAllUsersUseCase {
  execute(getAllUsersDto: GetAllUsersDto): Promise<User[]>;
}

export class GetAllUsers implements GetAllUsersUseCase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(getAllUsersDto: GetAllUsersDto): Promise<User[]> {
    const users = await this.userRepository.getAllUsers(getAllUsersDto);
    return users.map((u) => ({ ...u, password: '' }));
  }
}
