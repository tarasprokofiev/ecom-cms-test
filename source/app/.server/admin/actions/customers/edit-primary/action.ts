import {ActionFunctionArgs, redirect} from '@remix-run/node';
import {getAuthUser} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {prisma} from '~/.server/shared/services/prisma.service';
import {validationError} from 'remix-validated-form';
import {editPrimaryFormValidator} from '~/admin/components/customers/EditPrimaryForm/EditPrimaryForm.validator';
import {hasAdminRoleOrRedirect} from '~/.server/admin/utils/auth.util';

export async function action({request, params}: ActionFunctionArgs) {
  const authUser = await getAuthUser(request);
  hasAdminRoleOrRedirect(authUser);

  const {id} = params;
  if (!id) {
    return redirect(EAdminNavigation.customers);
  }

  // get customer
  const customer = await prisma.customer.findFirst({
    where: {id: Number(id)}
  });

  // if not exist
  if (!customer) {
    return redirect(EAdminNavigation.customers);
  }

  // validate form data
  const data = await editPrimaryFormValidator.validate(
    await request.formData()
  );

  if (data.error) {
    return validationError(data.error);
  }

  const {email, lastName, firstName, phone} = data.data;

  // check unique email
  const exist = await prisma.customer.findFirst({
    where: {
      email,
      id: {
        not: Number(id)
      }
    }
  });

  if (exist) {
    return validationError({
      fieldErrors: {
        email: 'Email already exists'
      }
    });
  }

  // update Customer
  await prisma.customer.update({
    where: {id: Number(id)},
    data: {
      email,
      firstName,
      lastName,
      phone,
    }
  });

  // redirect to user page
  return redirect(`${EAdminNavigation.customers}/${id}`);
}
