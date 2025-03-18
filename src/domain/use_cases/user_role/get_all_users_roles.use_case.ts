import { GetAllUsersRolesDto } from '../../dtos/user_role';
import { UserRole } from '../../entities';
import { UserRoleRepository } from '../../repositories';

interface GetAllUsersRolesUseCase {
  execute(getAllUsersRolesDto: GetAllUsersRolesDto): Promise<UserRole[]>;
}

export class GetAllUsersRoles implements GetAllUsersRolesUseCase {
  private readonly userRoleRepository: UserRoleRepository;

  constructor(userRoleRepository: UserRoleRepository) {
    this.userRoleRepository = userRoleRepository;
  }

  async execute(getAllUsersRolesDto: GetAllUsersRolesDto): Promise<UserRole[]> {
    return this.userRoleRepository.getAll(getAllUsersRolesDto);
  }
}
