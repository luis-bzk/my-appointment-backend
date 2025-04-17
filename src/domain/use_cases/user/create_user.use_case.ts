import { User } from '../../entities';
import { CreateUserDto } from '../../dtos/user';
import { UserRepository } from '../../../adapters/repositories';
import { CustomError } from '../../errors';

interface CreateUserUseCase {
  execute(createUserDto: CreateUserDto): Promise<User>;
}

export class CreateUser implements CreateUserUseCase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(createUserDto: CreateUserDto): Promise<User> {
    const userEmail = await this.userRepository.findUserByEmail(
      createUserDto.email,
    );
    if (userEmail) {
      throw CustomError.conflict(
        'El email solicitado ya se encuentra registrado',
      );
    }

    const user = await this.userRepository.createNewUser(createUserDto);
    if (!user) {
      throw CustomError.internalServer('No se pudo crear el usuario');
    }

    return { ...user, password: '' };
  }
}
