import type {Customer} from '@prisma/client';

type ExcludedField = 'id' | 'password' | 'createdAt' | 'updatedAt' | 'deletedAt'

export type TCustomerDto = Omit<Customer, ExcludedField> & {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
