import { CreateUserDto, GetAllUsersDto, UpdateUserDto } from '../dtos/user';
import { User } from '../entities';

export abstract class UserRepository {
  abstract findUserByEmail(email: string): Promise<User | null>;

  abstract createNewUser(createUserDto: CreateUserDto): Promise<User | null>;

  abstract findUserByEmailId(id: number, email: string): Promise<User | null>;

  abstract updateUser(updateUserDto: UpdateUserDto): Promise<User | null>;

  abstract findUserById(id: number): Promise<User | null>;

  abstract getAllUsers(getAllUsersDto: GetAllUsersDto): Promise<User[]>;

  abstract deleteUser(id: number): Promise<User | null>;
}
