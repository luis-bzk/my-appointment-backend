import {
  CreateUserDto,
  DeleteUserDto,
  GetAllUsersDto,
  GetUserDto,
  UpdateUserDto,
} from '../../domain/dtos/user';
import { User } from '../../domain/entities';
import { UserRepository } from '../../domain/repositories';
import { UserDataSource } from '../../domain/data_sources';

export class UserRepositoryImpl implements UserRepository {
  private readonly userDataSource: UserDataSource;

  constructor(userDataSource: UserDataSource) {
    this.userDataSource = userDataSource;
  }

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.userDataSource.create(createUserDto);
  }

  update(updateUserDto: UpdateUserDto): Promise<User> {
    return this.userDataSource.update(updateUserDto);
  }

  get(getUserDto: GetUserDto): Promise<User> {
    return this.userDataSource.get(getUserDto);
  }

  getAll(getAllUsersDto: GetAllUsersDto): Promise<User[]> {
    return this.userDataSource.getAll(getAllUsersDto);
  }

  delete(deleteUserDto: DeleteUserDto): Promise<User> {
    return this.userDataSource.delete(deleteUserDto);
  }
}
