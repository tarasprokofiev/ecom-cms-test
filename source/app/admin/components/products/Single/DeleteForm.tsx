import {Box, Button, Divider, InlineStack, Text} from '@shopify/polaris';
import React, {FC} from 'react';
import {ValidatedForm} from 'remix-validated-form';
import {ValidatedSubmitButton} from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import type {TProductDto} from '~/.server/admin/dto/product.dto';
import {deleteFormValidator} from '~/admin/components/products/Single/DeleteForm.validator';
import {ValidatedAction} from '~/admin/ui/ValidatedAction/ValidatedAction';
import {EAdminProductAction} from '~/admin/constants/action.constant';

type Props = {
  product: Pick<TProductDto, 'translations'>;
  toggleActive: () => void;
}

export const DeleteForm: FC<Props> = (props) => {
  const {product, toggleActive} = props;
  // const {title} = product;
  const title = 'Fix me';
  return (
    <ValidatedForm validator={deleteFormValidator} method="post" onSubmit={toggleActive}>
      <Box padding="200" paddingBlockEnd="0">
        <ValidatedAction action={EAdminProductAction.deleteProduct}/>
      </Box>
      <Box padding="400" paddingBlockStart="200">
        <Text as="p">
          Are you sure you want to delete {title}?
        </Text>
      </Box>
      <Divider/>
      <Box padding="400">
        <InlineStack direction="row-reverse" align="end" gap="200">
          <ValidatedSubmitButton text={'Delete'} variant="primary" tone="critical"/>
          <Button onClick={toggleActive}>Cancel</Button>
        </InlineStack>
      </Box>
    </ValidatedForm>
  );
};
