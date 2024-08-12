import {BlockStack, Card, FormLayout, Text} from '@shopify/polaris';
import React from 'react';
import {ValidatedTextField} from '~/admin/ui/ValidatedTextField/ValidatedTextField';

export const AddressCard = () => {

  return (
    <Card>
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Delivery Address
        </Text>
        <FormLayout>
          <ValidatedTextField
            label="Country"
            type="text"
            name="address.country"
            autoComplete="country"
          />
          <FormLayout.Group>
            <ValidatedTextField
              label="First Name"
              type="text"
              name="address.firstName"
              autoComplete="given-name"
            />
            <ValidatedTextField
              label="Last Name"
              type="text"
              name="address.lastName"
              autoComplete="family-name"
            />
          </FormLayout.Group>
          <ValidatedTextField
            label="Company"
            type="text"
            name="address.company"
            autoComplete="organization"
          />
          <ValidatedTextField
            label="Address"
            type="text"
            name="address.address"
            autoComplete="address-line1"
          />
          <ValidatedTextField
            label="Apartment, suite, etc"
            type="text"
            name="address.apartment"
            autoComplete="apartment"
          />
          <FormLayout.Group>
            <ValidatedTextField
              label="City"
              type="text"
              name="address.city"
              autoComplete="city"
            />
            <ValidatedTextField
              label="Postal Code"
              type="text"
              name="address.postalCode"
              autoComplete="postal-code"
            />
          </FormLayout.Group>
          <ValidatedTextField
            label="Phone"
            type="text"
            name="address.phone"
            autoComplete="phone"
          />
        </FormLayout>
      </BlockStack>
    </Card>
  );
};
