import {redirect} from '@remix-run/node';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {prisma} from '~/.server/shared/utils/prisma.util';
import {validationError} from 'remix-validated-form';
import {addressDeleteFormValidator} from '~/admin/components/customers/Single/AddressDeleteForm.validator';

type Args = {
  id: string;
  formData: FormData;
}

export async function deleteAddress({id, formData}: Args) {
// validate form data
  const data = await addressDeleteFormValidator.validate(
    formData
  );

  if (data.error) {
    return validationError(data.error);
  }

  const {addressId} = data.data;

  // update user
  await prisma.customerAddress.deleteMany({
    where: {id: Number(addressId)},
  });

  // redirect to user page
  return redirect(`${EAdminNavigation.customers}/${id}`);
}
