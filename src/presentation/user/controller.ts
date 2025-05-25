import { Request, Response } from 'express';

import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetAllUsersUseCase,
  GetUserUseCase,
  UpdateUserUseCase,
} from '../../domain/use_cases/user';
import { UserRepository } from '../../ports/repositories';
import { BaseController } from '../BaseController';

export class UserController extends BaseController {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    super();
    this.userRepository = userRepository;
  }

  createUser = async (req: Request, res: Response) => {
    try {
      const data = await new CreateUserUseCase(this.userRepository).execute(
        req.body,
      );

      // TODO: send email notification

      return res.status(201).json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const data = await new UpdateUserUseCase(this.userRepository).execute({
        ...req.params,
        ...req.body,
      });
      return res.status(200).json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  };

  getUser = async (req: Request, res: Response) => {
    try {
      const data = await new GetUserUseCase(this.userRepository).execute({
        id: req.params.id,
      });
      return res.status(200).json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  };

  getAllUsers = async (req: Request, res: Response) => {
    try {
      const data = await new GetAllUsersUseCase(this.userRepository).execute(
        req.query,
      );

      return res.status(200).json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    try {
      const data = await new DeleteUserUseCase(this.userRepository).execute({
        id: req.params.id,
      });
      return res.status(200).json(data);
    } catch (err) {
      this.handleError(err, res);
    }
  };
}
