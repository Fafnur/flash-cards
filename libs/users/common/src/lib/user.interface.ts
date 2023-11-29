export enum UserStatus {
  Created = 'created',
  Verified = 'verified',
  Recovering = 'recovering',
  Rejected = 'rejected',
  Removed = 'removed',
}

export interface User {
  readonly uuid: string;
  readonly email: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly status: UserStatus;
}

export interface UserChange {
  readonly firstname: string;
  readonly lastname: string;
  readonly email: string;
}

export const USERS_KEY = 'users';
