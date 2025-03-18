import { UserRole } from '../../entities';
import { UpdateUserRoleDto } from '../../dtos/user_role';
import { UserRoleRepository } from '../../repositories';

interface UpdateUserRoleUseCase {
  execute(updateUserRoleDto: UpdateUserRoleDto): Promise<UserRole>;
}

export class UpdateUserRole implements UpdateUserRoleUseCase {
  private readonly userRoleRepository: UserRoleRepository;

  constructor(userRoleRepository: UserRoleRepository) {
    this.userRoleRepository = userRoleRepository;
  }

  async execute(updateUserRoleDto: UpdateUserRoleDto): Promise<UserRole> {
    return this.userRoleRepository.update(updateUserRoleDto);
  }
}
