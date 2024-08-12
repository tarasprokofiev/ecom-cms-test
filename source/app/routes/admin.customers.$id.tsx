import React, {useCallback, useMemo, useState} from 'react';
import {useLoaderData} from '@remix-run/react';
import {Modal, Page} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {adminUsersSingleAction} from '~/.server/admin/actions/users.single.action';
import {TAdminCustomersSingleLoader} from '~/.server/admin/loaders/customers/single/loader';
import {Single} from '~/admin/components/customers/Single/Single';

export {loader} from '~/.server/admin/loaders/customers/single/loader';

export const action = adminUsersSingleAction;

export default function AdminCustomersSingle() {
  const {customer} = useLoaderData<TAdminCustomersSingleLoader>();
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const deleteAction = useMemo(() => (
    {
      content: 'Delete customer',
      destructive: true,
      onAction: toggleActive,
    }
  ), [toggleActive]);

  const secondaryActions = useMemo(() => {
    return customer.deletedAt ? [] : [deleteAction];
  }, [deleteAction, customer.deletedAt]);

  return (
    <Page
      title={`${customer.firstName} ${customer.lastName}`}
      backAction={{
        url: EAdminNavigation.users
      }}
      secondaryActions={secondaryActions}
    >
      <Single customer={customer}/>
      <Modal
        size="small"
        open={active}
        onClose={toggleActive}
        title="Delete customer"
      >
        {/*<UsersDeleteForm toggleActive={toggleActive} fullName={user.fullName}/>*/}
      </Modal>
    </Page>
  );
}
