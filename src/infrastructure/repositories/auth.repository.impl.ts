import { User } from '../../domain/entities';
import { AuthRepository } from '../../adapters/repositories';
import { AuthDataSource } from '../../adapters/data_sources';
import { UserMapper } from '../mappers/user.mapper';
import {
  ChangePasswordDto,
  GoogleAuthDto,
  SignupUserDto,
} from '../../domain/schemas/auth';

export class AuthRepositoryImpl implements AuthRepository {
  private readonly authDataSource: AuthDataSource;

  constructor(authDataSource: AuthDataSource) {
    this.authDataSource = authDataSource;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.authDataSource.findUserByEmail(email);
    return UserMapper.entityFromObject(user);
  }

  async findUserByEmailComplete(email: string): Promise<User | null> {
    const user = await this.authDataSource.findUserByEmail(email);
    return UserMapper.entityFromObject(user, { includePassword: true });
  }

  async createUser(signupUserDto: SignupUserDto): Promise<User | null> {
    const user = await this.authDataSource.createUser(signupUserDto);
    return UserMapper.entityFromObject(user);
  }

  async generateToken(userId: number): Promise<User | null> {
    const user = await this.authDataSource.generateToken(userId);
    return UserMapper.entityFromObject(user);
  }

  async findUserByToken(token: string): Promise<User | null> {
    const user = await this.authDataSource.findUserByToken(token);
    return UserMapper.entityFromObject(user);
  }

  async changePassword(
    changePasswordDto: ChangePasswordDto,
  ): Promise<User | null> {
    const user = await this.authDataSource.changePassword(changePasswordDto);
    return UserMapper.entityFromObject(user);
  }

  async cleanToken(token: string): Promise<User | null> {
    const user = await this.authDataSource.cleanToken(token);
    return UserMapper.entityFromObject(user);
  }

  async createGoogleUser(
    googleAuthDto: GoogleAuthDto,
    password: string,
  ): Promise<User | null> {
    const user = await this.authDataSource.createGoogleUser(
      googleAuthDto,
      password,
    );
    return UserMapper.entityFromObject(user);
  }
}
