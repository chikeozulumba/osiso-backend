import { Exclude, Type } from 'class-transformer';
import { ModelsEntity } from '../../models.serializer';
import { IUser } from '../interfaces/users.interface';
import { IResponse } from '../../../../definition';

export const defaultUsersGroupsForSerializing: string[] = ['user.timestamps'];
export const extendedUsersGroupsForSerializing: string[] = [
  ...defaultUsersGroupsForSerializing,
];

export const allUsersGroupsForSerializing: string[] = [
  ...extendedUsersGroupsForSerializing,
  'data.password',
  'status',
];

export class UsersEntityRequest {
  constructor(partial: Partial<UsersEntityRequest>) {
    Object.assign(this, partial);
  }
  user: UserEntity;
}

export class UsersEntityResponse implements IResponse<any> {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  statusCode: number;
  status?: boolean | 'success' | 'error';
  message?: string;

  data:
    | UserEntity
    | UserEntity[]
    | UsersVerificationEntity
    | UsersEntityRequest;
}

export class UserEntity extends ModelsEntity implements IUser {
  constructor(partial: Partial<ModelsEntity>) {
    super();
    Object.assign(this, partial);
  }

  id: string;

  @Exclude()
  password: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}

export class UsersVerificationEntity extends UserEntity {
  constructor(partial: Partial<UserEntity>) {
    super(partial);
    Object.assign(this, partial);
  }

  @Type(() => UserEntity)
  user: UserEntity;
}
