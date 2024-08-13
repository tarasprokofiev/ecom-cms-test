import {ActionFunctionArgs, redirect} from '@remix-run/node';
import {authenticator} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {validationError} from 'remix-validated-form';
import {prisma} from '~/.server/shared/utils/prisma.util';
import {editFormValidator} from '~/admin/components/customers/addresses/EditForm/EditForm.validator';

export async function action({request, params}: ActionFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });

  const {id, addressId} = params;
  if (!id || !addressId) {
    return redirect(EAdminNavigation.customers);
  }

  // get customer address
  const customerAddress = await prisma.customerAddress.findFirst({
    where: {id: Number(addressId), customerId: Number(id)}
  });

  // if not exist
  if (!customerAddress) {
    return redirect(EAdminNavigation.customers);
  }

  // validate form data
  const data = await editFormValidator.validate(
    await request.formData()
  );

  if (data.error) {
    return validationError(data.error);
  }

  const {address} = data.data;

  // create new Address
  await prisma.customerAddress.update({
    where: {
      id: customerAddress.id
    },
    data: {
      ...address,
    }
  });

  return redirect(`${EAdminNavigation.customers}/${id}`);
}
