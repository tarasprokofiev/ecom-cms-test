import {ActionFunctionArgs, redirect} from '@remix-run/node';
import {getAuthUser} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {prisma} from '~/.server/shared/services/prisma.service';
import {validationError} from 'remix-validated-form';
import {
  editTranslationFormValidation
} from '~/admin/components/products/EditTranslationForm/EditTranslationForm.validation';

export async function action({request, params}: ActionFunctionArgs) {
  await getAuthUser(request);

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

  // validate form data
  const data = await editTranslationFormValidation.validate(
    await request.formData()
  );

  if (data.error) {
    return validationError(data.error);
  }

  const {translations} = data.data;

  // update translations
  for (const idx in translations) {
    const translation = translations[idx];

    await prisma.productTranslation.upsert({
      where: {
        ProductTranslationProductIdLanguageUnique: {
          productId: product.id,
          language: translation.language
        }
      },
      update: {
        ...translation
      },
      create: {
        ...translation,
        productId: product.id
      }
    });
  }

  // update Product
  await prisma.product.update({
    where: {id: Number(id)},
    data: {
      updatedAt: new Date()
    }
  });

  // redirect to user page
  return redirect(`${EAdminNavigation.products}/${id}`);
}
