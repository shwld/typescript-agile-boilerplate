import {
  AccountEntity,
  ProjectEntity,
  UpdatableProjectEntityFields,
  UserEntity,
} from '../../models';
import { generateTimeStampProperties } from '../../shared/entity';

export const buildProject = (
  projectParams: UpdatableProjectEntityFields & {
    id: string;
    account: AccountEntity;
    createdBy: UserEntity;
  }
): ProjectEntity => {
  const { account, createdBy, ...params } = projectParams;
  return new ProjectEntity({
    ...generateTimeStampProperties(),
    ...params,
    accountId: account.id,
    createdById: createdBy.id,
  });
};
