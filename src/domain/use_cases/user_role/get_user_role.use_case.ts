import { UserRole } from '../../entities';
import { GetUserRoleDto } from '../../dtos/user_role';
import { UserRoleRepository } from '../../../adapters/repositories';

interface GetUserRoleUseCase {
  execute(getUserRoleDto: GetUserRoleDto): Promise<UserRole>;
}

export class GetUserRole implements GetUserRoleUseCase {
  private readonly userRoleRepository: UserRoleRepository;

  constructor(userRoleRepository: UserRoleRepository) {
    this.userRoleRepository = userRoleRepository;
  }

  async execute(getUserRoleDto: GetUserRoleDto): Promise<UserRole> {
    return this.userRoleRepository.get(getUserRoleDto);
  }
}
