import {BlockStack, Box, Button, Card, InlineGrid, Modal, ResourceItem, ResourceList, Text} from '@shopify/polaris';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {PlusIcon} from '@shopify/polaris-icons';
import React, {FC, useCallback, useMemo, useState} from 'react';
import type {TCustomerDto} from '~/.server/admin/dto/customer.dto';
import {AddressDeleteForm} from '~/admin/components/customers/Single/AddressDeleteForm';

export type AddressesCardProps = {
  customer: TCustomerDto;
}

export const AddressesCard: FC<AddressesCardProps> = ({customer}) => {
  const [deletedId, setDeletedId] = useState<string | null>(null);
  const deletedAddress = customer.addresses.find(({id}) => id === deletedId);

  const resourceName = useMemo(() => ({singular: 'address', plural: 'addresses'}), []);

  const renderItem = useCallback((item: TCustomerDto['addresses'][0]) => {
    const {id, lastName, firstName, address, phone, city, country, apartment, company, postalCode} = item;

    const shortcutActions = [
      {
        content: 'Edit',
        accessibilityLabel: `Edit address ${id}`,
        url: `${EAdminNavigation.customers}/${customer.id}/addresses/${id}/edit`,
      },
      {
        content: 'Delete',
        accessibilityLabel: `Delete address ${id}`,
        onAction: () => setDeletedId(id),
      },
    ];

    return (
      <ResourceItem
        id={id}
        onClick={() => {
        }}
        shortcutActions={shortcutActions}
        persistActions
      >
        <BlockStack gap="400">
          <BlockStack gap="200">
            <Text as="h3" variant="headingXs" fontWeight="medium">
              Contact Information
            </Text>
            <Text as="p" variant="bodyMd">
              {firstName} {lastName}
            </Text>
            <Text as="p" variant="bodyMd">
              {phone}
            </Text>
            <Text as="p" variant="bodyMd">
              {company}
            </Text>
          </BlockStack>
          <BlockStack gap="200">
            <Text as="h3" variant="headingXs" fontWeight="medium">
              Address
            </Text>
            <Text as="p" variant="bodyMd">
              {country}
            </Text>
            <Text as="p" variant="bodyMd">
              {city}, {address}, {apartment}
            </Text>
            <Text as="p" variant="bodyMd">
              {postalCode}
            </Text>
          </BlockStack>
        </BlockStack>

      </ResourceItem>
    );
  }, [customer.id]);

  return (
    <Card padding="0">
      <Box padding="400">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            Primary info
          </Text>
          <Button
            url={`${EAdminNavigation.customers}/${customer.id}/addresses/new`}
            accessibilityLabel="Add new address"
            icon={PlusIcon}
          />
        </InlineGrid>
      </Box>
      <ResourceList
        resourceName={resourceName}
        items={customer.addresses}
        renderItem={renderItem}
      />
      <Modal
        size="small"
        open={!!deletedAddress}
        onClose={() => setDeletedId(null)}
        title={`Delete address id: ${deletedId}`}
      >
        {deletedAddress && <AddressDeleteForm toggleActive={() => setDeletedId(null)} address={deletedAddress}/>}
      </Modal>
    </Card>
  );
};
