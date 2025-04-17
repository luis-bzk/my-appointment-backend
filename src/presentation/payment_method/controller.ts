import { Request, Response } from 'express';
import {
  CreatePaymentMethodDto,
  DeletePaymentMethodDto,
  GetAllPaymentMethodsDto,
  GetPaymentMethodDto,
  UpdatePaymentMethodDto,
} from '../../domain/dtos/payment_method';
import { CustomError } from '../../domain/errors';
import {
  CreatePaymentMethod,
  DeletePaymentMethod,
  GetAllPaymentMethods,
  GetPaymentMethod,
  UpdatePaymentMethod,
} from '../../domain/use_cases/payment_method';
import { PaymentMethodRepository } from '../../adapters/repositories';

export class PaymentMethodController {
  private readonly paymentMethodRepository: PaymentMethodRepository;

  constructor(paymentMethodRepository: PaymentMethodRepository) {
    this.paymentMethodRepository = paymentMethodRepository;
  }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  };

  createPaymentMethod = (req: Request, res: Response) => {
    const [error, createPaymentMethodDto] = CreatePaymentMethodDto.create(
      req.body,
    );
    if (error) return res.status(400).json({ error });

    new CreatePaymentMethod(this.paymentMethodRepository)
      .execute(createPaymentMethodDto!)
      .then((data) => res.status(201).json(data))
      .catch((error) => this.handleError(error, res));
  };

  updatePaymentMethod = (req: Request, res: Response) => {
    const [error, updatePaymentMethodDto] = UpdatePaymentMethodDto.create(
      req.params,
      req.body,
    );
    if (error) return res.status(400).json({ error });

    new UpdatePaymentMethod(this.paymentMethodRepository)
      .execute(updatePaymentMethodDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  getPaymentMethod = (req: Request, res: Response) => {
    const [error, getPaymentMethodDto] = GetPaymentMethodDto.create(req.params);
    if (error) return res.status(400).json({ error });

    new GetPaymentMethod(this.paymentMethodRepository)
      .execute(getPaymentMethodDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  getAllPaymentMethods = (req: Request, res: Response) => {
    const [error, getAllPaymentMethodsDto] = GetAllPaymentMethodsDto.create(
      req.query,
    );
    if (error) return res.status(400).json({ error });

    new GetAllPaymentMethods(this.paymentMethodRepository)
      .execute(getAllPaymentMethodsDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  deletePaymentMethod = (req: Request, res: Response) => {
    const [error, deletePaymentMethodDto] = DeletePaymentMethodDto.create(
      req.params,
    );
    if (error) return res.status(400).json(error);

    new DeletePaymentMethod(this.paymentMethodRepository)
      .execute(deletePaymentMethodDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };
}
