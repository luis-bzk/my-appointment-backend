import { User } from '../../entities';
import { CustomError } from '../../errors';
import { UserRepository } from '../../../ports/repositories';
import {
  UpdateUserDto,
  UpdateUserParamsDto,
  UpdateUserSchema,
} from '../../schemas/user';

export class UpdateUserUseCase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(dto: UpdateUserParamsDto): Promise<User> {
    const { success, error, data: schema } = UpdateUserSchema.safeParse(dto);

    if (!success) {
      const message = error.errors[0]?.message || 'Datos inválidos';
      throw CustomError.badRequest(message);
    }

    const schemaParsed: UpdateUserDto = {
      ...schema,
      id: parseInt(schema.id, 10),
    };

    const userId = await this.userRepository.findUserById(schemaParsed.id);
    if (!userId) {
      throw CustomError.notFound('No se ha encontrado el usuario a actualizar');
    }

    const userEmailId = await this.userRepository.findUserByEmailId(
      schemaParsed.id,
      schemaParsed.email,
    );
    if (userEmailId) {
      throw CustomError.conflict('Ya existe un usuario con el email ingresado');
    }

    const updatedEmail = await this.userRepository.updateUser(schemaParsed);
    if (!updatedEmail) {
      throw CustomError.conflict('No se pudo actualizar el usuario');
    }

    return updatedEmail;
  }
}
