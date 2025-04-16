import { VerifyAccountDto } from '../../dtos/email';
import { CustomError } from '../../errors';
import { EmailRepository } from '../../repositories';

interface RecoverPasswordUseCase {
  execute(verifyAccountDto: VerifyAccountDto): Promise<void>;
}

export class RecoverPasswordEmail implements RecoverPasswordUseCase {
  private readonly emailRepository: EmailRepository;

  constructor(emailRepository: EmailRepository) {
    this.emailRepository = emailRepository;
  }

  async execute(verifyAccountDto: VerifyAccountDto): Promise<void> {
    const emailSend =
      await this.emailRepository.sendEmailRecoverPassword(verifyAccountDto);

    if (!emailSend) {
      throw CustomError.internalServer(
        'No se ha podido enviar el email para recuperar la cuenta',
      );
    }
  }
}
