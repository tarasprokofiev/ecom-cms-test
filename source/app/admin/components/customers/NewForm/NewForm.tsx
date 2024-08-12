import {BlockStack, Layout} from '@shopify/polaris';
import React from 'react';
import {PrimaryInfoCard} from './PrimaryInfoCard';
import {SecurityCard} from './SecurityCard';

export const NewForm = () => {
  return (
    <Layout>
      <Layout.Section>
        <BlockStack gap="500">
          <PrimaryInfoCard/>
          <SecurityCard/>
        </BlockStack>
      </Layout.Section>
    </Layout>
  );
};
