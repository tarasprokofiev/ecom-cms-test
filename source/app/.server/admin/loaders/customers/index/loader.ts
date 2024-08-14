import {json, LoaderFunctionArgs} from '@remix-run/node';
import {prisma} from '~/.server/shared/utils/prisma.util';
import {withZod} from '@rvf/zod';
import {z} from 'zod';
import {Prisma} from '@prisma/client';
import type {SerializeFrom} from '@remix-run/server-runtime';
import {customerMapper} from '~/.server/admin/mappers/customer.mapper';
import {queryToPagination, sortValueToField} from '~/.server/admin/utils/query.util';

type CustomerOrderByWithRelationInput = Prisma.CustomerOrderByWithRelationInput;

export enum EAccountStatus {
  active = 'active',
  disabled = 'disabled'
}

export enum ECustomersSortVariant {
  createdAt_asc = 'createdAt_asc',
  createdAt_desc = 'createdAt_desc',
  updatedAt_asc = 'updatedAt_asc',
  updatedAt_desc = 'updatedAt_desc',
  deletedAt_asc = 'deletedAt_asc',
  deletedAt_desc = 'deletedAt_desc',
}

export const customerQueryValidator = withZod(
  z.object({
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

  let searchQuery;
  let filterAccountStatusQuery;
  let orderBy: CustomerOrderByWithRelationInput = {createdAt: 'desc' as const};

  if (data?.q) {
    searchQuery = {
      OR: [
        {email: {contains: data?.q, mode: 'insensitive' as const}},
        {firstName: {contains: data?.q, mode: 'insensitive' as const}},
        {lastName: {contains: data?.q, mode: 'insensitive' as const}},
        {phone: {contains: data?.q, mode: 'insensitive' as const}},
        {
          addresses: {
            some: {
              OR: [
                {firstName: {contains: data?.q, mode: 'insensitive' as const}},
                {lastName: {contains: data?.q, mode: 'insensitive' as const}},
                {address: {contains: data?.q, mode: 'insensitive' as const}},
                {phone: {contains: data?.q, mode: 'insensitive' as const}},
                {company: {contains: data?.q, mode: 'insensitive' as const}}
              ]
            }
          }
        }
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

  const pagination = await queryToPagination(searchParams);

  const customers = await prisma.customer.findMany({
    include: {
      addresses: true
    },
    take: pagination.take,
    skip: pagination.skip,
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

  pagination.hasNext = pagination.skip + pagination.take < pagination.total;

  return json({customers: customers.map(customerMapper), query: data, pagination});
}

export type TAdminCustomersLoader = typeof loader;
export type TAdminCustomersLoaderData = SerializeFrom<typeof loader>;
