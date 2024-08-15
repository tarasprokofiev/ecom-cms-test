import {ActionFunctionArgs, redirect} from '@remix-run/node';
import {authenticator} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {prisma} from '~/.server/shared/services/prisma.service';
import {$Enums} from '@prisma/client';

export async function action({request, params}: ActionFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });

  const {id} = params;
  if (!id) {
    return redirect(EAdminNavigation.products);
  }

  // get product
  const product = await prisma.product.findFirst({
    where: {id: Number(id)}
  });

  // if not exist
  if (!product) {
    return redirect(EAdminNavigation.products);
  }

  // update product
  await prisma.product.update({
    where: {id: Number(id)},
    data: {
      status: $Enums.ProductStatus.ARCHIVED,
      deletedAt: new Date()
    }
  });

  // redirect to user page
  return redirect(`${EAdminNavigation.products}/${id}`);
}
