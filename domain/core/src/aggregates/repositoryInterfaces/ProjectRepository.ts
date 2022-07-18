import type { AccountEntity, ProjectEntity, UserEntity } from '../../models';
import { PaginationArguments, Repository } from './base';

export interface ProjectRepository
  extends Repository<ProjectEntity, { account: AccountEntity }> {
  findByUser: (args: {
    id: string;
    user: UserEntity;
  }) => Promise<ProjectEntity | undefined>;
}
