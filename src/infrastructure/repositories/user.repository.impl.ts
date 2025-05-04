import { TotalQuery, User } from '../../domain/entities';
import { UserRepository } from '../../ports/repositories';
import { UserDataSource } from '../../ports/data_sources';
import { TotalQueryMapper, UserMapper } from '../mappers';
import {
  CreateUserDto,
  GetAllUsersDto,
  UpdateUserDto,
} from '../../domain/schemas/user';

export class UserRepositoryImpl implements UserRepository {
  private readonly userDataSource: UserDataSource;

  constructor(userDataSource: UserDataSource) {
    this.userDataSource = userDataSource;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.userDataSource.findUserByEmail(email);
    return UserMapper.entityFromObject(user);
  }

  async createNewUser(createUserDto: CreateUserDto): Promise<User | null> {
    const user = await this.userDataSource.createNewUser(createUserDto);
    return UserMapper.entityFromObject(user, { includePassword: true });
  }

  async findUserByEmailId(id: number, email: string): Promise<User | null> {
    const user = await this.userDataSource.findUserByEmailId(id, email);
    return UserMapper.entityFromObject(user);
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<User | null> {
    const user = await this.userDataSource.updateUser(updateUserDto);
    return UserMapper.entityFromObject(user);
  }

  async findUserById(id: number): Promise<User | null> {
    const user = await this.userDataSource.findUserById(id);
    return UserMapper.entityFromObject(user);
  }

  async getAllUsers(getAllUsersDto: GetAllUsersDto): Promise<User[]> {
    const users = await this.userDataSource.getAllUsers(getAllUsersDto);
    return UserMapper.entitiesFromArray(users);
  }

  async countAvailableUsers(): Promise<TotalQuery | null> {
    const row = await this.userDataSource.countAvailableUsers();
    return TotalQueryMapper.mapTotalQuery(row);
  }

  async deleteUser(id: number): Promise<User | null> {
    const user = await this.userDataSource.deleteUser(id);
    return UserMapper.entityFromObject(user);
  }

  async getUsersById(ids: number[]): Promise<User[]> {
    const users = await this.userDataSource.getUsersById(ids);
    return UserMapper.entitiesFromArray(users);
  }
}
