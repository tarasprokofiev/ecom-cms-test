import React from 'react';
import {useLoaderData} from '@remix-run/react';
import {Page} from '@shopify/polaris';
import {PlusIcon} from '@shopify/polaris-icons';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import type {TAdminCustomersLoader} from '~/.server/admin/loaders/customers/list/loader';

export {loader} from '~/.server/admin/loaders/customers/list/loader';


export default function AdminCustomersIndex() {
  const data = useLoaderData<TAdminCustomersLoader>();

  console.log('data', data);

  return (
    <Page
      fullWidth
      title="Customers"
      primaryAction={{
        content: 'Create customer',
        icon: PlusIcon,
        accessibilityLabel: 'Create customer',
        url: EAdminNavigation.customersCreate,
      }}
    >
      {/*<AdminUsersTable users={data.users} query={data.query} pagination={data.pagination}/>*/}
    </Page>
  );
}

