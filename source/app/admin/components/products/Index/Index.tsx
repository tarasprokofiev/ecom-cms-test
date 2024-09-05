import {Card, IndexTable, Link,} from '@shopify/polaris';
import React, {FC, useMemo} from 'react';
import type {NonEmptyArray} from '@shopify/polaris/build/ts/src/types';
import {IndexTableHeading} from '@shopify/polaris/build/ts/src/components/IndexTable/IndexTable';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {IOffsetPaginationInfoDto} from '~/.server/shared/dto/offset-pagination-info.dto';
import {usePagination} from '~/admin/hooks/usePagination';
import {TProductDto} from '~/.server/admin/dto/product.dto';
import type {TAdminProductsLoaderData} from '~/.server/admin/loaders/products/index/loader';
import {Filters} from './Filters';
import {translatedTitle} from '~/admin/utils/product.util';
import {useTranslation} from 'react-i18next';

export interface ListProps {
  products: TProductDto[];
  query?: TAdminProductsLoaderData['query'];
  pagination: IOffsetPaginationInfoDto;
}


export const Index: FC<ListProps> = ({products, query, pagination}) => {
  const {i18n} = useTranslation();
  const paginationProps = usePagination(pagination);
  const resourceName = useMemo(() => ({
    singular: 'product',
    plural: 'products',
  }), []);

  const headings: NonEmptyArray<IndexTableHeading> = useMemo(() => ([
    {title: 'Slug'},
    {title: 'Title'},
    {title: 'Category'},
    {title: 'SKU'},
    {title: 'Barcode'},
    {title: 'Status'},
    {title: 'Quantity'},
  ]), []);

  const rowMarkup = products.map(
    (
      {id, slug, sku, barcode, status, quantity, category, translations},
      index,
    ) => (
      <IndexTable.Row
        id={id}
        key={id}
        position={index}
      >
        <IndexTable.Cell>
          <Link url={`${EAdminNavigation.products}/${id}`}>{slug}</Link>
        </IndexTable.Cell>
        <IndexTable.Cell>
          {translatedTitle(translations, i18n.language)}
        </IndexTable.Cell>
        <IndexTable.Cell>{category?.title || '-/-'}</IndexTable.Cell>
        <IndexTable.Cell>{sku}</IndexTable.Cell>
        <IndexTable.Cell>{barcode}</IndexTable.Cell>
        <IndexTable.Cell>{status}</IndexTable.Cell>
        <IndexTable.Cell>{quantity}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <Card padding="0">
      <Filters query={query}/>
      <IndexTable
        resourceName={resourceName}
        itemCount={products.length}
        selectable={false}
        headings={headings}
        pagination={paginationProps}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  );
};
