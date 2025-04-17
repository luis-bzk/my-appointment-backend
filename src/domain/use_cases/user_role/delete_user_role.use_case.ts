import { UserRole } from '../../entities';
import { DeleteUserRoleDto } from '../../dtos/user_role';
import { UserRoleRepository } from '../../../adapters/repositories';

interface DeleteUserRoleUseCase {
  execute(deleteUserRoleDto: DeleteUserRoleDto): Promise<UserRole>;
}

export class DeleteUserRole implements DeleteUserRoleUseCase {
  private readonly userRoleRepository: UserRoleRepository;

  constructor(userRoleRepository: UserRoleRepository) {
    this.userRoleRepository = userRoleRepository;
  }

  async execute(deleteUserRoleDto: DeleteUserRoleDto): Promise<UserRole> {
    return this.userRoleRepository.delete(deleteUserRoleDto);
  }
}
