import { CustomError } from '../../errors';
import { EmailRepository } from '../../../ports/repositories';
import { VerifyAccountDto, VerifyAccountSchema } from '../../schemas/email';

export class VerifyAccountEmailUseCase {
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

    const emailSend = await this.emailRepository.sendEmailVerifyAccount(schema);

    if (!emailSend) {
      throw CustomError.internalServer(
        'No se ha podido enviar el email de verificación',
      );
    }
  }
}
