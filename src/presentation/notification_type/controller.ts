import { Request, Response } from 'express';

import { CustomError } from '../../domain/errors';
import { NotificationTypeRepository } from '../../ports/repositories';
import {
  CreateNotificationTypeUseCase,
  DeleteNotificationTypeUseCase,
  GetAllNotificationTypesUseCase,
  GetNotificationTypeUseCase,
  UpdateNotificationTypeUseCase,
} from '../../domain/use_cases/notification_type';

export class NotificationTypeController {
  private readonly notificationTypeRepository: NotificationTypeRepository;

  constructor(notificationTypeRepository: NotificationTypeRepository) {
    this.notificationTypeRepository = notificationTypeRepository;
  }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    // unknown error
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  };

  createNotificationType = async (req: Request, res: Response) => {
    try {
      const data = await new CreateNotificationTypeUseCase(
        this.notificationTypeRepository,
      ).execute(req.body);
      return res.status(201).json(data);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  updateNotificationType = async (req: Request, res: Response) => {
    try {
      const data = await new UpdateNotificationTypeUseCase(
        this.notificationTypeRepository,
      ).execute({ ...req.params, ...req.body });

      return res.status(200).json(data);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  getNotificationType = async (req: Request, res: Response) => {
    try {
      const data = await new GetNotificationTypeUseCase(
        this.notificationTypeRepository,
      ).execute({ id: req.params.id });

      return res.status(200).json(data);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  getAllNotificationTypes = async (req: Request, res: Response) => {
    try {
      const data = await new GetAllNotificationTypesUseCase(
        this.notificationTypeRepository,
      ).execute(req.query);

      return res.status(200).json(data);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  deleteNotificationTypes = async (req: Request, res: Response) => {
    try {
      const data = await new DeleteNotificationTypeUseCase(
        this.notificationTypeRepository,
      ).execute({ id: req.params.id });

      return res.status(200).json(data);
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
