import { Request, Response } from 'express';

import {
  CreateUserDto,
  DeleteUserDto,
  GetAllUsersDto,
  GetUserDto,
  UpdateUserDto,
} from '../../domain/dtos/user';
import {
  CreateUser,
  DeleteUser,
  GetAllUsers,
  GetUser,
  UpdateUser,
} from '../../domain/use_cases/user';
import { CustomError } from '../../domain/errors';
import { UserRepository } from '../../domain/repositories';
import { EmailGateway } from '../../infrastructure/gateways';

export class UserController {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log({ error });
    return res.status(500).json({ error: 'Internal Server Error' });
  };

  createUser = (req: Request, res: Response) => {
    const [error, createUserDto] = CreateUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new CreateUser(this.userRepository)
      .execute(createUserDto!)
      .then(async (data) => {
        await EmailGateway.sendLoginAccount({
          email: data.email,
          name: data.last_name,
          last_name: data.last_name,
          password: data.password,
        });

        return res.status(201).json(data);
      })
      .catch((error) => this.handleError(error, res));
  };

  updateUser = (req: Request, res: Response) => {
    const [error, updateUserDto] = UpdateUserDto.create(req.params, req.body);
    if (error) return res.status(400).json({ error });

    new UpdateUser(this.userRepository)
      .execute(updateUserDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  getUser = (req: Request, res: Response) => {
    const [error, getUserDto] = GetUserDto.create(req.params);
    if (error) return res.status(400).json({ error });

    new GetUser(this.userRepository)
      .execute(getUserDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  getAllUsers = (req: Request, res: Response) => {
    const [error, getAllUsersDto] = GetAllUsersDto.create(req.query);
    if (error) return res.status(400).json({ error });

    new GetAllUsers(this.userRepository)
      .execute(getAllUsersDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  deleteUser = (req: Request, res: Response) => {
    const [error, deleteUserDto] = DeleteUserDto.create(req.params);
    if (error) return res.status(200).json({ error });

    new DeleteUser(this.userRepository)
      .execute(deleteUserDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };
}
