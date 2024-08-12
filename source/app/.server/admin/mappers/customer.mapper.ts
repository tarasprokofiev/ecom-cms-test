import {Customer} from '@prisma/client';
import {TCustomerDto} from '~/.server/admin/dto/customer.dto';

export const customerMapper = (user: Customer): TCustomerDto => {
  return {
    id: String(user.id),
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    note: user.note,
    email: user.email,
    createdAt: user.createdAt.toJSON(),
    updatedAt: user.updatedAt.toJSON(),
    deletedAt: user.deletedAt ? user.deletedAt.toJSON() : null,
  };
};
