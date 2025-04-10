import { User } from '../entities';
import {
  ChangePasswordDto,
  CheckTokenDto,
  ConfirmAccountDto,
  GoogleAuthDto,
  LoginUserDto,
  RecoverPasswordDto,
  RequireAuthDto,
  SignupUserDto,
} from '../dtos/auth';

export abstract class AuthDataSource {
  abstract login(loginUserDto: LoginUserDto): Promise<User>;

  abstract signup(signupUserDto: SignupUserDto): Promise<User>;

  abstract recoverPassword(
    recoverPasswordDto: RecoverPasswordDto,
  ): Promise<User>;

  abstract changePassword(changePasswordDto: ChangePasswordDto): Promise<User>;

  abstract checkToken(checkTokenDto: CheckTokenDto): Promise<User>;

  abstract confirmAccount(confirmAccountDto: ConfirmAccountDto): Promise<User>;

  abstract requireAuth(requireAuthDto: RequireAuthDto): Promise<User>;

  abstract googleAuth(googleAuthDto: GoogleAuthDto): Promise<User>;
}
