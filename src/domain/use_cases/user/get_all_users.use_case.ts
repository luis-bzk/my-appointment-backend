import { User } from '../../entities';
import { UserRepository } from '../../../ports/repositories';
import { CustomError } from '../../errors';
import {
  GetAllFiltersDto,
  GetAllFiltersPortDto,
  GetAllFiltersSchema,
} from '../../schemas/general';

export class GetAllUsersUseCase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(
    dto: GetAllFiltersPortDto,
  ): Promise<{ totalUsers: number; users: User[] }> {
    const { success, error, data: schema } = GetAllFiltersSchema.safeParse(dto);

    if (!success) {
      const message = error.errors[0]?.message || 'Parámetros inválidos';
      throw CustomError.badRequest(message);
    }

    const parsedSchema: GetAllFiltersDto = {
      ...schema,
      limit: schema.limit ? parseInt(schema.limit ?? '', 10) : 50,
      offset: schema.offset ? parseInt(schema.offset ?? '', 10) : undefined,
    };

    const users = await this.userRepository.getAllUsers(parsedSchema);

    const totalUsers = await this.userRepository.countAvailableUsers();
    if (!totalUsers) {
      throw CustomError.notFound('No se ha encontrado el total de usuarios');
    }
    return { totalUsers: totalUsers.total, users };
  }
}
