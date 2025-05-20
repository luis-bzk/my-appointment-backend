import { LoginAccountDto, VerifyAccountDto } from '../../domain/schemas/email';

export abstract class EmailRepository {
  abstract sendEmailVerifyAccount(
    verifyAccountDto: VerifyAccountDto,
  ): Promise<boolean>;

  abstract sendLoginAccount(loginAccountDto: LoginAccountDto): Promise<boolean>;

  abstract sendEmailRecoverPassword(
    verifyAccountDto: VerifyAccountDto,
  ): Promise<boolean>;
}
