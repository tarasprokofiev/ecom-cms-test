import {ActionFunctionArgs, redirect} from '@remix-run/node';
import {authenticator} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {prisma} from '~/.server/shared/utils/prisma.util';
import {EAdminCustomerAction, FORM_ACTION_FIELD} from '~/admin/constants/action.constant';
import {validationError} from 'remix-validated-form';
import {deleteAddress} from '~/.server/admin/actions/customers/single/delete-address';

export async function action({request, params}: ActionFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });

  const {id} = params;
  if (!id) {
    return redirect(EAdminNavigation.customers);
  }

  // get user
  const customer = await prisma.customer.findFirst({
    where: {id: Number(id)}
  });

  // if not exist
  if (!customer) {
    return redirect(EAdminNavigation.customers);
  }

  const formData = await request.formData();
  switch (formData.get(FORM_ACTION_FIELD)) {
    case EAdminCustomerAction.deleteAddress:
      return deleteAddress({id, formData});
    case EAdminCustomerAction.deleteCustomer:
      throw new Error('Not implemented');
  }

  return validationError({
    fieldErrors: {
      [FORM_ACTION_FIELD]: 'Invalid action'
    }
  });
}
