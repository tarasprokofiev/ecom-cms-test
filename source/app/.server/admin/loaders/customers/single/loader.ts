import {json, LoaderFunctionArgs, redirect} from '@remix-run/node';
import {getAuthUser} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {prisma} from '~/.server/shared/services/prisma.service';
import {customerMapper} from '~/.server/admin/mappers/customer.mapper';
import {SerializeFrom} from '@remix-run/server-runtime';
import {hasAdminRoleOrRedirect} from '~/.server/admin/utils/auth.util';

export async function loader({request, params}: LoaderFunctionArgs) {
  const authUser = await getAuthUser(request);
  hasAdminRoleOrRedirect(authUser);

  const {id} = params;
  if (!id) {
    return redirect(EAdminNavigation.customers);
  }

  // get user
  const customer = await prisma.customer.findFirst({
    include: {
      addresses: true,
    },
    where: {id: Number(id)}
  });

  // if not exist
  if (!customer) {
    return redirect(EAdminNavigation.customers);
  }

  return json({customer: customerMapper(customer)});
}

export type TAdminCustomersSingleLoader = typeof loader;
export type TAdminCustomersSingleLoaderData = SerializeFrom<typeof loader>;
