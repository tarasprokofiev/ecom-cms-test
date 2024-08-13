import {BlockStack, Box, Layout} from '@shopify/polaris';
import React, {FC} from 'react';
import {AddressCard} from '~/admin/components/customers/NewForm/AddressCard';
import {TCustomerAddressDto} from '~/.server/admin/dto/customer.dto';

type Props = {
  address: TCustomerAddressDto;
};

export const EditForm: FC<Props> = (props) => {
  const {address} = props;

  return (
    <Box paddingBlockEnd="500">
      <Layout>
        <Layout.Section>
          <BlockStack gap="500">
            <AddressCard address={address}/>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Box>
  );
};
