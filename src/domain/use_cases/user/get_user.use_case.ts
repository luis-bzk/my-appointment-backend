import { User } from '../../entities';
import { GetUserDto } from '../../dtos/user';
import { UserRepository } from '../../../adapters/repositories';
import { CustomError } from '../../errors';

interface GetUserUseCase {
  execute(getUserDto: GetUserDto): Promise<User>;
}

export class GetUser implements GetUserUseCase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(getUserDto: GetUserDto): Promise<User> {
    const user = await this.userRepository.findUserById(getUserDto.id);
    if (!user) {
      throw CustomError.notFound('No se ha encontrado el usuario solicitado');
    }

    return { ...user, password: '' };
  }
}
