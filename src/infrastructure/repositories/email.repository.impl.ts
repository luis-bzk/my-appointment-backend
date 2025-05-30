import { EmailRepository } from '../../ports/repositories';
import { EmailService } from '../../ports/services';
import { LoginAccountDto, VerifyAccountDto } from '../../domain/schemas/email';

export class EmailRepositoryImpl implements EmailRepository {
  private readonly emailService: EmailService;

  constructor(emailService: EmailService) {
    this.emailService = emailService;
  }

  async sendEmailVerifyAccount(
    verifyAccountDto: VerifyAccountDto,
  ): Promise<boolean> {
    return this.emailService.sendEmailVerifyAccount(verifyAccountDto);
  }

  async sendLoginAccount(loginAccountDto: LoginAccountDto): Promise<boolean> {
    return this.emailService.sendLoginAccount(loginAccountDto);
  }

  async sendEmailRecoverPassword(
    verifyAccountDto: VerifyAccountDto,
  ): Promise<boolean> {
    return this.emailService.sendEmailRecoverPassword(verifyAccountDto);
  }
}
