import { User } from '../../entities';
import { UserRepository } from '../../../ports/repositories';
import { GetUsersByIdsDto, GetUsersByIdsSchema } from '../../schemas/user';
import { CustomError } from '../../errors';

export class GetUsersByIdUseCase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(dto: GetUsersByIdsDto): Promise<User[]> {
    const { success, error, data: schema } = GetUsersByIdsSchema.safeParse(dto);

    if (!success) {
      const message = error.errors[0]?.message || 'Parámetros inválidos';
      throw CustomError.badRequest(message);
    }

    const users = await this.userRepository.getUsersById(schema.ids);
    return users;
  }
}
