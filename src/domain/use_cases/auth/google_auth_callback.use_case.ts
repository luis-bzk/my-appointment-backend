import { AuthRepository } from '../../../adapters/repositories';

import { CustomError } from '../../errors';
import { BcryptAdapter } from '../../../config';
import { GeneratorValues } from '../../../utils';
import { GoogleAuthDto, GoogleAuthSchema } from '../../schemas/auth';

type HashFunction = (password: string) => string;

export class GoogleAuthCallbackUseCase {
  private readonly authRepository: AuthRepository;
  private readonly hashPassword: HashFunction;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
    this.hashPassword = BcryptAdapter.hash;
  }

  async execute(object: GoogleAuthDto) {
    const { success, error, data: schema } = GoogleAuthSchema.safeParse(object);
    if (!success) {
      const message = error.errors[0]?.message || 'Datos inválidos';
      throw CustomError.badRequest(message);
    }

    const user = await this.authRepository.findUserByEmail(schema.email);
    if (user) {
      return { ...user, password: '' };
    }

    const generatedPassword = this.hashPassword(
      GeneratorValues.passwordGenerator(),
    );

    const createdUser = await this.authRepository.createGoogleUser(
      schema,
      generatedPassword,
    );
    if (!createdUser) {
      throw CustomError.internalServer('Error al crear el usuario con google');
    }
    return { ...createdUser, password: '' };
  }
}
