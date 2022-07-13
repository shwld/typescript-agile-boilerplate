import { GenericEntityProperties } from '../../shared/entity';
import { genericValidator } from '../../shared/validator';
import { userValidator } from './userValidator';

export type UpdatableUserEntityFields = {
  email: string;
  name: string;
  avatarImageUrl: string;
};

export type UserEntityFields = GenericEntityProperties &
  UpdatableUserEntityFields;

export class UserEntity implements UserEntityFields {
  readonly id;
  readonly createdAt;
  readonly updatedAt;
  readonly isDeleted;

  readonly email;
  readonly name;
  readonly avatarImageUrl;

  constructor(
    args: Omit<GenericEntityProperties, 'isDeleted'> & UpdatableUserEntityFields
  ) {
    this.createdAt = genericValidator.createdAt.parse(args.createdAt);
    this.updatedAt = genericValidator.updatedAt.parse(args.updatedAt);
    this.isDeleted = false;

    this.id = userValidator.id.parse(args.id);
    this.email = userValidator.email.parse(args.email);
    this.name = userValidator.name.parse(args.name);
    this.avatarImageUrl = userValidator.avatarImageUrl.parse(
      args.avatarImageUrl
    );
  }
}