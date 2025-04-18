import { EmailRepository } from '../../adapters/repositories';
import { EmailService } from '../../adapters/services';
import { LoginAccountDto, VerifyAccountDto } from '../../domain/dtos/email';

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
