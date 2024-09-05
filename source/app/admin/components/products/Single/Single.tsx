import {BlockStack, Box, Layout} from '@shopify/polaris';
import React, {FC} from 'react';
import {PrimaryInfoCard} from './PrimaryInfoCard';
import {TProductDto} from '~/.server/admin/dto/product.dto';
import {CategoryCard} from '~/admin/components/products/Single/CategoryCard';
import {TCategoryDto} from '~/.server/admin/dto/category.dto';
import {TitleCard} from '~/admin/components/products/Single/TitleCard';
import {DescriptionCard} from '~/admin/components/products/Single/DescriptionCard';

export type SingleProps = {
  product: TProductDto;
  categories: TCategoryDto[];
}

export const Single: FC<SingleProps> = ({product, categories}) => {
  return (
    <Layout>
      <Layout.Section>
        <BlockStack gap="500">
          <TitleCard product={product}/>
          <DescriptionCard product={product}/>
        </BlockStack>
      </Layout.Section>

      <Layout.Section variant="oneThird">
        <PrimaryInfoCard product={product}/>
        <Box padding="200"/>
        <CategoryCard product={product} categories={categories}/>
      </Layout.Section>
    </Layout>
  );
};
