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

  createUser = async (req: Request, res: Response) => {
    try {
      const [error, createUserDto] = CreateUserDto.create(req.body);
      if (error) return res.status(400).json({ error });

      const data = await new CreateUser(this.userRepository).execute(
        createUserDto!,
      );

      await EmailGateway.sendLoginAccount({
        email: data.email,
        name: data.last_name,
        last_name: data.last_name,
        password: data.password,
      });

      return res.status(201).json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const [error, updateUserDto] = UpdateUserDto.create(req.params, req.body);
      if (error) return res.status(400).json({ error });

      const data = await new UpdateUser(this.userRepository).execute(
        updateUserDto!,
      );
      return res.status(200).json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  };

  getUser = async (req: Request, res: Response) => {
    try {
      const [error, getUserDto] = GetUserDto.create(req.params);
      if (error) return res.status(400).json({ error });

      const data = await new GetUser(this.userRepository).execute(getUserDto!);
      return res.status(200).json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  };

  getAllUsers = async (req: Request, res: Response) => {
    try {
      const [error, getAllUsersDto] = GetAllUsersDto.create(req.query);
      if (error) return res.status(400).json({ error });

      const data = await new GetAllUsers(this.userRepository).execute(
        getAllUsersDto!,
      );
      return res.status(200).json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    try {
      const [error, deleteUserDto] = DeleteUserDto.create(req.params);
      if (error) return res.status(200).json({ error });

      const data = await new DeleteUser(this.userRepository).execute(
        deleteUserDto!,
      );
      return res.status(200).json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  };
}
