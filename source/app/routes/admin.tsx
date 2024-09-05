import {Outlet, useLoaderData} from '@remix-run/react';
import polarisStylesHref from '@shopify/polaris/build/esm/styles.css?url';
import {LinksFunction} from '@remix-run/node';
import {AppProvider,} from '@shopify/polaris';
import React from 'react';
import {adminLoader} from '~/.server/admin/loaders/admin.loader';
import {useTranslation} from 'react-i18next';

export const links: LinksFunction = () => [
  {rel: 'stylesheet', href: polarisStylesHref},
];

export const loader = adminLoader;

export default function Admin() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const data = useLoaderData<typeof loader>();
  const {i18n} = useTranslation();
  const polarisTranslations = i18n.getResourceBundle(i18n.language, 'common');

  return (
    <AppProvider
      i18n={polarisTranslations}
    >
      <Outlet/>
    </AppProvider>
  );
}
