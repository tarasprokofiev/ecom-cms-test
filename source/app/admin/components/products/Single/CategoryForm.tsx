import {Box, Button, Divider, FormLayout, InlineStack, SelectProps} from '@shopify/polaris';
import React, {FC, useEffect, useMemo} from 'react';
import {ValidatedForm} from 'remix-validated-form';
import {ValidatedSelect} from '~/admin/ui/ValidatedSelect/ValidatedSelect';
import {ValidatedSubmitButton} from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import {ValidatedAction} from '~/admin/ui/ValidatedAction/ValidatedAction';
import {EAdminProductAction} from '~/admin/constants/action.constant';
import {TProductDto} from '~/.server/admin/dto/product.dto';
import {categoryFormValidator} from '~/admin/components/products/Single/CategoryForm.validator';
import {TCategoryDto} from '~/.server/admin/dto/category.dto';
import {useFetcher} from '@remix-run/react';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import type {TAdminCategoriesLoader} from '~/.server/admin/loaders/categories/index/loader';

type Props = {
  categoryId: TProductDto['categoryId'];
  categories: TCategoryDto[];
  toggleActive: () => void;
}

export const CategoryForm: FC<Props> = (props) => {
  const {categoryId, categories, toggleActive} = props;
  const fetcher = useFetcher<TAdminCategoriesLoader>();

  useEffect(() => {
    console.log('fetcher.submit');
    fetcher.load(`${EAdminNavigation.categories}?index`);
  }, []);

  console.log('fetcher.data', fetcher.data?.categories);


  const roleOptions: SelectProps['options'] = useMemo(() => (
    [
      {
        label: 'Select category',
        value: '',
      },
      ...(
        categories.map((category) => ({
          label: category.title,
          value: category.id,
        }))
      )
    ]
  ), [categories]);

  return (
    <ValidatedForm validator={categoryFormValidator} method="post" onSubmit={toggleActive}>
      <Box padding="200" paddingBlockEnd="0">
        <ValidatedAction action={EAdminProductAction.updateCategory}/>
      </Box>

      <Box padding="400" paddingBlockStart="200">
        <FormLayout>
          <ValidatedSelect
            label={null}
            name="categoryId"
            options={roleOptions}
            defaultValue={String(categoryId)}
          />
        </FormLayout>
      </Box>
      <Divider/>
      <Box padding="400">
        <InlineStack direction="row-reverse" align="end" gap="200">
          <ValidatedSubmitButton text={'Save'} variant="primary"/>
          <Button onClick={toggleActive}>Cancel</Button>
        </InlineStack>
      </Box>
    </ValidatedForm>
  );
};
