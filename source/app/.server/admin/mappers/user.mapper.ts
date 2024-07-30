import {User} from '@prisma/client';
import {IUserDto} from '~/.server/admin/dto/user.dto';

export const userMapper = (user: User): IUserDto => {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    fullName: user.fullName,
    createdAt: user.createdAt.toJSON(),
    updatedAt: user.updatedAt.toJSON(),
    deletedAt: user.deletedAt ? user.deletedAt.toJSON() : null,
  };
};
