import { CustomError } from '../../errors';
import { EmailRepository } from '../../../adapters/repositories';
import { VerifyAccountDto, VerifyAccountSchema } from '../../schemas/email';

export class RecoverPasswordEmailUseCase {
  private readonly emailRepository: EmailRepository;

  constructor(emailRepository: EmailRepository) {
    this.emailRepository = emailRepository;
  }

  async execute(object: VerifyAccountDto): Promise<void> {
    const {
      success,
      error,
      data: schema,
    } = VerifyAccountSchema.safeParse(object);
    if (!success) {
      const message = error.errors[0]?.message || 'Datos inválidos';
      throw CustomError.badRequest(message);
    }

    const emailSend =
      await this.emailRepository.sendEmailRecoverPassword(schema);

    if (!emailSend) {
      throw CustomError.internalServer(
        'No se ha podido enviar el email para recuperar la cuenta',
      );
    }
  }
}
