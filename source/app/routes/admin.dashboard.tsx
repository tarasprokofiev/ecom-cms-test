import React from 'react';
import {BaseLayout} from '~/admin/layouts/BaseLayout/BaseLayout';
import {Outlet} from '@remix-run/react';


export default function AdminDashboard() {
  return (
    <BaseLayout>
      <Outlet/>
    </BaseLayout>
  );
}
