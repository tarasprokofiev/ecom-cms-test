import {User} from '@prisma/client';

type ExcludedField = 'password' | 'createdAt' | 'updatedAt' | 'deletedAt'

export interface IUserDto extends Omit<User, ExcludedField> {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
