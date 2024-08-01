import {json, LoaderFunctionArgs} from '@remix-run/node';
import {prisma} from '~/.server/shared/utils/prisma.util';
import {userMapper} from '~/.server/admin/mappers/user.mapper';
import {withZod} from '@rvf/zod';
import {z} from 'zod';
import {$Enums} from '@prisma/client';

//http://localhost:3000/admin/users?take=1&skip=0&q=ecomcms&role=ADMIN,STUFF&accountStatus=active

export enum EAccountStatus {
  active = 'active',
  disabled = 'disabled'
}

export const userQueryValidator = withZod(
  z.object({
    take: z.coerce.number().int().positive().optional(),
    skip: z.coerce.number().int().nonnegative().optional(),
    q: z.string().optional(),
    role: z.preprocess((val) => String(val).split(','), z.nativeEnum($Enums.AdminRole).array()).optional(),
    accountStatus: z.nativeEnum(EAccountStatus).optional()
  })
);


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function adminUsersLoader({request}: LoaderFunctionArgs) {
  const {searchParams} = new URL(request.url);

  const {data} = await userQueryValidator.validate(
    searchParams
  );

  let take = 15;
  let skip = 0;
  let searchQuery;
  let filterRoleQuery;
  let filterAccountStatusQuery;

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
        {fullName: {contains: data?.q, mode: 'insensitive' as const}}
      ]
    };
  }

  if (data?.role) {
    filterRoleQuery = {
      role: {
        in: data?.role
      }
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


  const users = await prisma.user.findMany({
    take,
    skip,
    where: {
      ...searchQuery,
      ...filterRoleQuery,
      ...filterAccountStatusQuery,
    }
  });

  return json({users: users.map(userMapper)});
}
