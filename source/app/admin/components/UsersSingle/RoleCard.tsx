import {BlockStack, Button, Card, InlineGrid, Text} from '@shopify/polaris';
import {EditIcon} from '@shopify/polaris-icons';
import React, {FC} from 'react';
import {TUserDto} from '~/.server/admin/dto/user.dto';

export type RoleCardProps = {
  user: TUserDto;
}

export const RoleCard: FC<RoleCardProps> = ({user}) => {
  return (
    <Card>
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            Role
          </Text>
          <Button
            onClick={() => console.log('open edit modal')}
            accessibilityLabel="Export variants"
            icon={EditIcon}
          />
        </InlineGrid>
        <Text as="p" variant="bodyMd">
          {user.role}
        </Text>
      </BlockStack>
    </Card>
  );
};
