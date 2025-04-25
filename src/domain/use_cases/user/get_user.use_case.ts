import { User } from '../../entities';
import { UserRepository } from '../../../adapters/repositories';
import { CustomError } from '../../errors';
import {
  GetUserDto,
  GetUserParamsDto,
  GetUserSchema,
} from '../../schemas/user';

export class GetUserUseCase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(params: GetUserParamsDto): Promise<User> {
    const { success, error, data: schema } = GetUserSchema.safeParse(params);

    if (!success) {
      const message = error.errors[0]?.message || 'Parámetros inválidos';
      throw CustomError.badRequest(message);
    }

    const parsedSchema: GetUserDto = {
      id: parseInt(schema.id, 10),
    };

    const user = await this.userRepository.findUserById(parsedSchema.id);
    if (!user) {
      throw CustomError.notFound('No se ha encontrado el usuario solicitado');
    }

    return { ...user, password: '' };
  }
}
