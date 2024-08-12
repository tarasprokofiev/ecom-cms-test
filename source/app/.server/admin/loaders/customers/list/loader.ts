import {json, LoaderFunctionArgs} from '@remix-run/node';
import {prisma} from '~/.server/shared/utils/prisma.util';
import {withZod} from '@rvf/zod';
import {z} from 'zod';
import {Prisma} from '@prisma/client';
import type {SerializeFrom} from '@remix-run/server-runtime';
import {IOffsetPaginationInfoDto} from '~/.server/shared/dto/offset-pagination-info.dto';
import {customerMapper} from '~/.server/admin/mappers/customer.mapper';

type CustomerOrderByWithRelationInput = Prisma.CustomerOrderByWithRelationInput;

export enum EAccountStatus {
  active = 'active',
  disabled = 'disabled'
}

export enum ECustomersSortVariant {
  id_asc = 'id_asc',
  id_desc = 'id_desc',
  createdAt_asc = 'createdAt_asc',
  createdAt_desc = 'createdAt_desc',
  updatedAt_asc = 'updatedAt_asc',
  updatedAt_desc = 'updatedAt_desc',
  deletedAt_asc = 'deletedAt_asc',
  deletedAt_desc = 'deletedAt_desc',
}

export const sortValueToField = <O extends object>(value: string) => {
  const [field, order] = value.split('_');
  return {
    [field]: order
  } as O;
};

export const customerQueryValidator = withZod(
  z.object({
    take: z.coerce.number().int().positive().optional(),
    skip: z.coerce.number().int().nonnegative().optional(),
    q: z.string().optional(),
    sort: z.nativeEnum(ECustomersSortVariant).optional(),
    accountStatus: z.nativeEnum(EAccountStatus).optional(),
  })
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function loader({request}: LoaderFunctionArgs) {
  const {searchParams} = new URL(request.url);
  const {data} = await customerQueryValidator.validate(
    searchParams
  );


  let take = 2;
  let skip = 0;
  let searchQuery;
  let filterAccountStatusQuery;
  let orderBy: CustomerOrderByWithRelationInput = {id: 'desc' as const};

  if (data?.take) {
    take = data.take;
  }

  if (data?.skip) {
    skip = data.skip;
  }

  if (data?.q) {
    searchQuery = {
      OR: [
        {email: {contains: data?.q, mode: 'insensitive' as const}},
        {firstName: {contains: data?.q, mode: 'insensitive' as const}},
        {lastName: {contains: data?.q, mode: 'insensitive' as const}},
        {phone: {contains: data?.q, mode: 'insensitive' as const}},
      ]
    };
  }

  if (data?.accountStatus === EAccountStatus.disabled) {
    filterAccountStatusQuery = {
      deletedAt: {
        not: null
      }
    };
  }

  if (data?.accountStatus === EAccountStatus.active) {
    filterAccountStatusQuery = {
      deletedAt: null
    };
  }

  if (data?.sort) {
    orderBy = sortValueToField<CustomerOrderByWithRelationInput>(data.sort);
  }

  const pagination: IOffsetPaginationInfoDto = {
    take,
    skip,
    hasNext: false,
    hasPrevious: skip > 0,
    total: 0,
    count: 0
  };

  const customers = await prisma.customer.findMany({
    take,
    skip,
    where: {
      ...searchQuery,
      ...filterAccountStatusQuery,
    },
    orderBy
  });

  pagination.count = customers.length;
  pagination.total = await prisma.customer.count({
    where: {
      ...searchQuery,
      ...filterAccountStatusQuery,
    }
  });

  pagination.hasNext = skip + take < pagination.total;

  return json({customers: customers.map(customerMapper), query: data, pagination});
}

export type TAdminCustomersLoader = typeof loader;
export type TAdminCustomersLoaderData = SerializeFrom<typeof loader>;
