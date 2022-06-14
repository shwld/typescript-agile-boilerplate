import { GenericEntityProperties } from '../shared/entity';
import { genericValidator } from '../shared/validator';
import { userValidator } from './validator';

export type UpdatableUserEntityFields = {
  email: string;
  name: string;
  picture: string;
};

export type UserEntityFields = GenericEntityProperties &
  UpdatableUserEntityFields;

export class UserEntity implements UserEntityFields {
  readonly id;
  readonly createdAt;
  readonly updatedAt;

  readonly email;
  readonly name;
  readonly picture;

  constructor(args: GenericEntityProperties & UpdatableUserEntityFields) {
    this.createdAt = genericValidator.createdAt.parse(args.createdAt);
    this.updatedAt = genericValidator.updatedAt.parse(args.updatedAt);

    this.id = userValidator.id.parse(args.id);
    this.email = userValidator.email.parse(args.email);
    this.name = userValidator.name.parse(args.name);
    this.picture = userValidator.picture.parse(args.picture);
  }
}