import React, {useCallback} from 'react';
import {Page} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {ValidatedForm} from 'remix-validated-form';
import {ValidatedSubmitButton} from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import {useLoaderData, useRouteLoaderData} from '@remix-run/react';
import {TAdminCustomersSingleLoader} from '~/.server/admin/loaders/customers/single/loader';
import {TAdminCustomersAddressEditLoader} from '~/.server/admin/loaders/customers/addresses/edit/loader';
import {EditForm} from '~/admin/components/customers/addresses/EditForm/EditForm';
import {editFormValidator} from '~/admin/components/customers/addresses/EditForm/EditForm.validator';

export {loader} from '~/.server/admin/loaders/customers/addresses/edit/loader';
export {action} from '~/.server/admin/actions/customers/addresses/edit/action';

export default function AdminCustomerAddressEdit() {
  const data = useRouteLoaderData<TAdminCustomersSingleLoader>('routes/admin.customers.$id');
  const {customerAddress} = useLoaderData<TAdminCustomersAddressEditLoader>();

  const primaryAction = useCallback(() => (
    <ValidatedSubmitButton text="save" variant="primary"/>
  ), []);

  if (!data?.customer) {
    return null;
  }

  return (
    <ValidatedForm validator={editFormValidator} method="post">
      <Page
        title={`Create new address for customer: ${data.customer.firstName} ${data.customer.lastName}`}
        backAction={{
          url: `${EAdminNavigation.customers}/${data.customer.id}`,
        }}
        primaryAction={primaryAction()}
      >
        <EditForm address={customerAddress}/>
      </Page>
    </ValidatedForm>
  );
}
