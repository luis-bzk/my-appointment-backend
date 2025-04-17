import { VerifyAccountDto } from '../../dtos/email';
import { CustomError } from '../../errors';
import { EmailRepository } from '../../../adapters/repositories';

interface VerifyAccountUseCase {
  execute(verifyAccountDto: VerifyAccountDto): Promise<void>;
}

export class VerifyAccountEmail implements VerifyAccountUseCase {
  private readonly emailRepository: EmailRepository;

  constructor(emailRepository: EmailRepository) {
    this.emailRepository = emailRepository;
  }

  async execute(verifyAccountDto: VerifyAccountDto): Promise<void> {
    const emailSend =
      await this.emailRepository.sendEmailVerifyAccount(verifyAccountDto);

    if (!emailSend) {
      throw CustomError.internalServer(
        'No se ha podido enviar el email de verificación',
      );
    }
  }
}
