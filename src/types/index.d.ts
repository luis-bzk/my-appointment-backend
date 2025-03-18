import { User } from '../domain/entities';

export {};

declare global {
  namespace Express {
    interface Request {
      current_user: User;
    }
  }
}
