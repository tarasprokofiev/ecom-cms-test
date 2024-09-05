import React, {useCallback} from 'react';
import {Page} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {ValidatedForm} from 'remix-validated-form';
import {ValidatedSubmitButton} from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import {useRouteLoaderData} from '@remix-run/react';
import {TAdminProductsSingleLoader} from '~/.server/admin/loaders/products/single/loader';
import {EditTranslationForm} from '~/admin/components/products/EditTranslationForm/EditTranslationForm';
import {
  editTranslationFormValidation
} from '~/admin/components/products/EditTranslationForm/EditTranslationForm.validation';

export {action} from '~/.server/admin/actions/products/edit-translation/action';

export default function AdminProductsIdEditPrimary() {
  const data = useRouteLoaderData<TAdminProductsSingleLoader>('routes/admin.products.$id');

  const primaryAction = useCallback(() => (
    <ValidatedSubmitButton text="save" variant="primary"/>
  ), []);

  if (!data?.product) {
    return null;
  }

  return (
    <ValidatedForm validator={editTranslationFormValidation} method="post">
      <Page
        title="Edit product translations"
        backAction={{
          url: `${EAdminNavigation.products}/${data.product.id}`,
        }}
        primaryAction={primaryAction()}
      >
        <EditTranslationForm product={data.product}/>
      </Page>
    </ValidatedForm>
  );
}
