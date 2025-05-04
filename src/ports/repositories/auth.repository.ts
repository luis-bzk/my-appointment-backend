import { User } from '../../domain/entities';
import {
  ChangePasswordDto,
  GoogleAuthDto,
  SignupUserDto,
} from '../../domain/schemas/auth';

export abstract class AuthRepository {
  abstract findUserByEmail(email: string): Promise<User | null>;

  abstract findUserByEmailComplete(email: string): Promise<User | null>;

  abstract createUser(signupUserDto: SignupUserDto): Promise<User | null>;

  abstract generateToken(userId: number): Promise<User | null>;

  abstract findUserByToken(token: string): Promise<User | null>;

  abstract changePassword(
    changePasswordDto: ChangePasswordDto,
  ): Promise<User | null>;

  abstract cleanToken(token: string): Promise<User | null>;

  abstract createGoogleUser(
    googleAuthDto: GoogleAuthDto,
    password: string,
  ): Promise<User | null>;
}
