import {BlockStack, Box, Layout} from '@shopify/polaris';
import React from 'react';
import {PrimaryInfoCard} from './PrimaryInfoCard';
import {TitleCard} from '~/admin/components/products/NewForm/TitleCard';
import {DescriptionCard} from '~/admin/components/products/NewForm/DescriptionCard';
import {LanguageHiddenCard} from '~/admin/components/products/NewForm/LanguageHiddenCard';

export const NewForm = () => {
  return (
    <Box paddingBlockEnd="500">
      <Layout>
        <Layout.Section>
          <BlockStack gap="500">
            <PrimaryInfoCard/>
            <TitleCard/>
            <DescriptionCard/>
            <LanguageHiddenCard/>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Box>
  );
};
