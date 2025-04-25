import { User } from '../../entities';
import { UserRepository } from '../../../adapters/repositories';
import { GetAllUsersSchema, GetAllUsersDto } from '../../schemas/user';
import { CustomError } from '../../errors';

export class GetAllUsersUseCase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(query: GetAllUsersDto): Promise<User[]> {
    const { success, error, data: schema } = GetAllUsersSchema.safeParse(query);

    if (!success) {
      const message = error.errors[0]?.message || 'Parámetros inválidos';
      throw CustomError.badRequest(message);
    }

    const users = await this.userRepository.getAllUsers(schema);
    return users.map((u) => ({ ...u, password: '' }));
  }
}
