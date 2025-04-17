import { UserRole } from '../../entities';
import { CreateUserRoleDto } from '../../dtos/user_role';
import { UserRoleRepository } from '../../../adapters/repositories';

interface CreateUserRoleUseCase {
  execute(createUserRoleDto: CreateUserRoleDto): Promise<UserRole>;
}

export class CreateUserRole implements CreateUserRoleUseCase {
  private readonly userRoleRepository: UserRoleRepository;

  constructor(userRoleRepository: UserRoleRepository) {
    this.userRoleRepository = userRoleRepository;
  }

  async execute(createUserRoleDto: CreateUserRoleDto): Promise<UserRole> {
    return this.userRoleRepository.create(createUserRoleDto);
  }
}
