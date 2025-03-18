import {
  CreateUserDto,
  DeleteUserDto,
  GetAllUsersDto,
  GetUserDto,
  UpdateUserDto,
} from '../dtos/user';
import { User } from '../entities';

export abstract class UserDataSource {
  abstract create(createUserDto: CreateUserDto): Promise<User>;

  abstract update(updateUserDto: UpdateUserDto): Promise<User>;

  abstract get(getUserDto: GetUserDto): Promise<User>;

  abstract getAll(getAllUsersDto: GetAllUsersDto): Promise<User[]>;

  abstract delete(deleteUserDto: DeleteUserDto): Promise<User>;
}
