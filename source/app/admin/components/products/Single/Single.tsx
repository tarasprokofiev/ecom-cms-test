import {BlockStack, Layout} from '@shopify/polaris';
import React, {FC} from 'react';
import {PrimaryInfoCard} from './PrimaryInfoCard';
import {TProductDto} from '~/.server/admin/dto/product.dto';

export type SingleProps = {
  product: TProductDto;
}

export const Single: FC<SingleProps> = ({product}) => {
  return (
    <Layout>
      <Layout.Section>
        <BlockStack gap="500">
          <PrimaryInfoCard product={product}/>
        </BlockStack>
      </Layout.Section>

      <Layout.Section variant="oneThird">
      </Layout.Section>
    </Layout>
  );
};
