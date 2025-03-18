import { User } from '../entities';
import { JwtAdapter } from '../../config';
import { RequireAuthDto } from '../dtos/auth';
import { RequireAuth } from '../use_cases/auth';
import { AuthRepository } from '../repositories';

interface UserPayload {
  id: number;
}

export class AuthService {
  private readonly authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  authenticateUser = async (token: string): Promise<User | null> => {
    const decoded = await JwtAdapter.validateToken<UserPayload>(token);

    if (!decoded) {
      return null;
    }

    const [error, requireAuthDto] = RequireAuthDto.create(decoded.id);
    if (error) return null;

    try {
      const requireAuth = new RequireAuth(this.authRepository);
      return await requireAuth.execute(requireAuthDto!);
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
