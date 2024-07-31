import React from 'react';
import {useLoaderData} from '@remix-run/react';
import {adminDashboardLoader} from '~/.server/admin/loaders/dashboard.loader';
import {Page} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {UsersSingle} from '~/admin/components/UsersSingle/UsersSingle';

export const loader = adminDashboardLoader;

export default function AdminUsersNew() {
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
