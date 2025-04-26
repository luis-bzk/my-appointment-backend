import { User } from '../../entities';
import { UserRepository } from '../../../adapters/repositories';
import {
  GetAllUsersSchema,
  GetAllUsersPortDto,
  GetAllUsersDto,
} from '../../schemas/user';
import { CustomError } from '../../errors';

export class GetAllUsersUseCase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(dto: GetAllUsersPortDto): Promise<User[]> {
    const { success, error, data: schema } = GetAllUsersSchema.safeParse(dto);

    if (!success) {
      const message = error.errors[0]?.message || 'Parámetros inválidos';
      throw CustomError.badRequest(message);
    }

    const parsedSchema: GetAllUsersDto = {
      limit: parseInt(schema.limit ?? '', 10),
      offset: parseInt(schema.offset ?? '', 10),
    };

    const users = await this.userRepository.getAllUsers(parsedSchema);
    return users.map((u) => ({ ...u, password: '' }));
  }
}
