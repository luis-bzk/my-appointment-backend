import {
  ChangePasswordDto,
  CheckTokenDto,
  ConfirmAccountDto,
  LoginUserDto,
  RecoverPasswordDto,
  RequireAuthDto,
  SignupUserDto,
  GoogleAuthDto,
} from '../../domain/dtos/auth';
import { User } from '../../domain/entities';
import { AuthRepository } from '../../domain/repositories';
import { AuthDataSource } from '../../domain/data_sources';

export class AuthRepositoryImpl implements AuthRepository {
  private readonly authDataSource: AuthDataSource;

  constructor(authDataSource: AuthDataSource) {
    this.authDataSource = authDataSource;
  }

  login(loginUserDto: LoginUserDto): Promise<User> {
    return this.authDataSource.login(loginUserDto);
  }

  signup(signupUserDto: SignupUserDto): Promise<User> {
    return this.authDataSource.signup(signupUserDto);
  }

  recoverPassword(recoverPasswordDto: RecoverPasswordDto): Promise<User> {
    return this.authDataSource.recoverPassword(recoverPasswordDto);
  }

  changePassword(changePasswordDto: ChangePasswordDto): Promise<User> {
    return this.authDataSource.changePassword(changePasswordDto);
  }

  checkToken(checkTokenDto: CheckTokenDto): Promise<User> {
    return this.authDataSource.checkToken(checkTokenDto);
  }

  confirmAccount(confirmAccountDto: ConfirmAccountDto): Promise<User> {
    return this.authDataSource.confirmAccount(confirmAccountDto);
  }

  requireAuth(requireAuthDto: RequireAuthDto): Promise<User> {
    return this.authDataSource.requireAuth(requireAuthDto);
  }

  googleAuth(googleAuthDto: GoogleAuthDto): Promise<User> {
    return this.authDataSource.googleAuth(googleAuthDto);
  }
}
