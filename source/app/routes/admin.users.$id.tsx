import React from 'react';
import {useLoaderData} from '@remix-run/react';
import {Page} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {UsersSingle} from '~/admin/components/UsersSingle/UsersSingle';
import {adminUsersSingleLoader} from '~/.server/admin/loaders/users.single.loader';
import {adminUsersSingleAction} from '~/.server/admin/actions/users.single.action';

export const loader = adminUsersSingleLoader;

export const action = adminUsersSingleAction;

export default function AdminUsersSingle() {
  const {user} = useLoaderData<typeof loader>();

  return (
    <Page
      title={user.fullName || ''}
      backAction={{
        url: EAdminNavigation.users
      }}
      secondaryActions={[
        {
          content: 'Security',
          accessibilityLabel: 'Security',
          url: `${EAdminNavigation.users}/${user.id}/security`
        },
      ]}
    >
      <UsersSingle user={user}/>
    </Page>
  );
}
