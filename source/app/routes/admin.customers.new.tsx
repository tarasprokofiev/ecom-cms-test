import React, {useCallback} from 'react';
import {Page} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {ValidatedForm} from 'remix-validated-form';
import {ValidatedSubmitButton} from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import {adminUsersNewAction} from '~/.server/admin/actions/users.new.action';
import {newFormValidator} from '~/admin/components/customers/NewForm/NewForm.validator';
import {NewForm} from '~/admin/components/customers/NewForm/NewForm';

export const action = adminUsersNewAction;

export default function AdminCustomerNew() {
  const primaryAction = useCallback(() => (
    <ValidatedSubmitButton text="save" variant="primary"/>
  ), []);

  return (
    <ValidatedForm validator={newFormValidator} method="post">
      <Page
        title="Create new customer"
        backAction={{
          url: EAdminNavigation.customers
        }}
        primaryAction={primaryAction()}
      >
        <NewForm/>
      </Page>
    </ValidatedForm>
  );
}
