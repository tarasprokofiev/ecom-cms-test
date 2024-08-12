import {BlockStack, Layout} from '@shopify/polaris';
import React, {FC} from 'react';
import {PrimaryInfoCard} from './PrimaryInfoCard';
import {TCustomerDto} from '~/.server/admin/dto/customer.dto';

export type SingleProps = {
  customer: TCustomerDto;
}

export const Single: FC<SingleProps> = ({customer}) => {
  return (
    <Layout>
      <Layout.Section>
        <BlockStack gap="500">
          <PrimaryInfoCard customer={customer}/>
        </BlockStack>
      </Layout.Section>

      <Layout.Section variant="oneThird">
      </Layout.Section>
    </Layout>
  );
};
