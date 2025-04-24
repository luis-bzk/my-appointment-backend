import { User } from '../../entities';
import { UserRepository } from '../../../adapters/repositories';

interface GetUsersByIdUseCase {
  execute(ids: number[]): Promise<User[]>;
}

export class GetUsersById implements GetUsersByIdUseCase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(ids: number[]): Promise<User[]> {
    const users = await this.userRepository.getUsersById(ids);
    return users.map((u) => ({ ...u, password: '' }));
  }
}
