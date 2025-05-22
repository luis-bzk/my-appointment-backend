import { TotalQueryDB, UserDB } from '../../data/interfaces';
import { GetAllFiltersDto } from '../../domain/schemas/general';
import { CreateUserDto, UpdateUserDto } from '../../domain/schemas/user';

export abstract class UserDataSource {
  abstract findUserByEmail(email: string): Promise<UserDB | null>;

  abstract createNewUser(createUserDto: CreateUserDto): Promise<UserDB | null>;

  abstract findUserByEmailId(id: number, email: string): Promise<UserDB | null>;

  abstract updateUser(updateUserDto: UpdateUserDto): Promise<UserDB | null>;

  abstract findUserById(id: number): Promise<UserDB | null>;

  abstract getAllUsers(getAllUsersDto: GetAllFiltersDto): Promise<UserDB[]>;

  abstract countAvailableUsers(): Promise<TotalQueryDB | null>;

  abstract deleteUser(id: number): Promise<UserDB | null>;

  abstract getUsersById(ids: number[]): Promise<UserDB[]>;
}
