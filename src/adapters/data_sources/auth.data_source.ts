import { UserDB } from '../../data/interfaces';
import {
  ChangePasswordDto,
  GoogleAuthDto,
  SignupUserDto,
} from '../../domain/schemas/auth';

export abstract class AuthDataSource {
  abstract findUserByEmail(email: string): Promise<UserDB | null>;

  abstract createUser(signupUserDto: SignupUserDto): Promise<UserDB | null>;

  abstract generateToken(userId: number): Promise<UserDB | null>;

  abstract findUserByToken(token: string): Promise<UserDB | null>;

  abstract changePassword(
    changePasswordDto: ChangePasswordDto,
  ): Promise<UserDB | null>;

  abstract cleanToken(token: string): Promise<UserDB | null>;

  abstract createGoogleUser(
    googleAuthDto: GoogleAuthDto,
    password: string,
  ): Promise<UserDB | null>;
}
