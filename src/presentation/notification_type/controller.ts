import { Request, Response } from 'express';

import { CustomError } from '../../domain/errors';
import { NotificationTypeRepository } from '../../adapters/repositories';
import {
  CreateNotificationTypeDto,
  DeleteNotificationTypeDto,
  GetAllNotificationTypesDto,
  GetNotificationTypeDto,
  UpdateNotificationTypeDto,
} from '../../domain/dtos/notification_type';
import {
  CreateNotificationType,
  UpdateNotificationType,
  DeleteNotificationType,
  GetAllNotificationTypes,
  GetNotificationType,
} from '../../domain/use_cases/notification_type';

export class NotificationTypeController {
  private readonly notificationTypeRepository: NotificationTypeRepository;

  constructor(notificationTypeRepository: NotificationTypeRepository) {
    this.notificationTypeRepository = notificationTypeRepository;
  }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    // unknown error
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  };

  createNotificationType = (req: Request, res: Response) => {
    const [error, createNotificationTypeDto] = CreateNotificationTypeDto.create(
      req.body,
    );
    if (error) return res.status(400).json({ error });

    new CreateNotificationType(this.notificationTypeRepository)
      .execute(createNotificationTypeDto!)
      .then((data) => res.status(201).json(data))
      .catch((error) => this.handleError(error, res));
  };

  updateNotificationType = (req: Request, res: Response) => {
    const [error, updateNotificationTypeDto] = UpdateNotificationTypeDto.create(
      req.params,
      req.body,
    );
    if (error) return res.status(400).json({ error });

    new UpdateNotificationType(this.notificationTypeRepository)
      .execute(updateNotificationTypeDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  getNotificationType = (req: Request, res: Response) => {
    const [error, getNotificationTypeDto] = GetNotificationTypeDto.create(
      req.params,
    );
    if (error) return res.status(400).json({ error });

    new GetNotificationType(this.notificationTypeRepository)
      .execute(getNotificationTypeDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  getAllNotificationTypes = (req: Request, res: Response) => {
    const [error, getAllNotificationTypesDto] =
      GetAllNotificationTypesDto.create(req.query);
    if (error) return res.status(400).json({ error });

    new GetAllNotificationTypes(this.notificationTypeRepository)
      .execute(getAllNotificationTypesDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  deleteNotificationTypes = (req: Request, res: Response) => {
    const [error, deleteNotificationTypeDto] = DeleteNotificationTypeDto.create(
      req.params,
    );
    if (error) return res.status(400).json({ error });

    new DeleteNotificationType(this.notificationTypeRepository)
      .execute(deleteNotificationTypeDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };
}
