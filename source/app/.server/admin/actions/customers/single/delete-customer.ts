import {redirect} from '@remix-run/node';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {prisma} from '~/.server/shared/utils/prisma.util';

export type Args = {
  id: string;
}

export async function deleteCustomer({id}: Args) {

  // update customer
  await prisma.customer.update({
    where: {id: Number(id)},
    data: {
      deletedAt: new Date()
    }
  });

  // redirect to user page
  return redirect(`${EAdminNavigation.customers}/${id}`);
}
