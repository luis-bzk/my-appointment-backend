import { LoginAccountDto } from '../../domain/dtos/email';
import { VerifyAccountDto } from '../../domain/schemas/email';

export abstract class EmailService {
  abstract sendEmailVerifyAccount(
    verifyAccountDto: VerifyAccountDto,
  ): Promise<boolean>;

  abstract sendLoginAccount(loginAccountDto: LoginAccountDto): Promise<boolean>;

  abstract sendEmailRecoverPassword(
    verifyAccountDto: VerifyAccountDto,
  ): Promise<boolean>;
}
