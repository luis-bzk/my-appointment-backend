import { UserRole } from '../../entities';
import { UserRoleRepository } from '../../repositories';
import { GetAllUsersRolesDto } from '../../dtos/user_role';

interface GetAllUsersRolesDetailUseCase {
  execute(getAllUsersRolesDto: GetAllUsersRolesDto): Promise<UserRole[]>;
}

export class GetAllUsersRolesDetail implements GetAllUsersRolesDetailUseCase {
  private readonly userRoleRepository: UserRoleRepository;

  constructor(userRoleRepository: UserRoleRepository) {
    this.userRoleRepository = userRoleRepository;
  }

  async execute(getAllUsersRolesDto: GetAllUsersRolesDto): Promise<UserRole[]> {
    return this.userRoleRepository.getAllDetail(getAllUsersRolesDto);
  }
}
