import {BlockStack, Box, Layout} from '@shopify/polaris';
import React, {FC} from 'react';
import {TProductDto} from '~/.server/admin/dto/product.dto';
import {TitleCard} from '~/admin/components/products/NewForm/TitleCard';
import {DescriptionCard} from '~/admin/components/products/NewForm/DescriptionCard';
import {LanguageHiddenCard} from '~/admin/components/products/NewForm/LanguageHiddenCard';

type Props = {
  product: Omit<TProductDto, 'category'>
}

export const EditTranslationForm: FC<Props> = ({product}) => {
  return (
    <Box paddingBlockEnd="500">
      <Layout>
        <Layout.Section>
          <BlockStack gap="500">
            <TitleCard product={product}/>
            <DescriptionCard product={product}/>
            <LanguageHiddenCard/>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Box>
  );
};
