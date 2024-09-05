import {ActionFunctionArgs, redirect} from '@remix-run/node';
import {getAuthUser} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {validationError} from 'remix-validated-form';
import {prisma} from '~/.server/shared/services/prisma.service';
import {newFormValidator} from '~/admin/components/products/NewForm/NewForm.validator';

export async function action({request}: ActionFunctionArgs) {
  await getAuthUser(request);

  // validate form data
  const data = await newFormValidator.validate(
    await request.formData()
  );

  if (data.error) {
    return validationError(data.error);
  }

  const {slug, sku, compareAtPrice, price, barcode, quantity, costPerItem, translations} = data.data;

  // check unique slug
  const exist = await prisma.product.findFirst({where: {slug}});
  if (exist) {
    return validationError({
      fieldErrors: {
        email: 'Product with this slug already exist'
      }
    });
  }

  // create new Product
  const newProduct = await prisma.product.create({
    data: {
      slug,
      sku,
      compareAtPrice,
      price,
      barcode,
      quantity,
      costPerItem,
    }
  });

  await prisma.productTranslation.createMany({
    data: translations.map((translation) => ({
      ...translation,
      productId: newProduct.id
    }))
  });

  return redirect(`${EAdminNavigation.products}/${newProduct.id}`);
}
