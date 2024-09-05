import {withZod} from '@rvf/zod';
import {z} from 'zod';
import {
  barcodeRule,
  compareAtPriceRule,
  costPerItemRule,
  priceRule,
  quantityRule,
  skuRule,
  slugRule
} from '~/admin/components/products/NewForm/NewForm.validator';


export const editPrimaryFormValidator = withZod(
  z.object({
    slug: slugRule,
    price: priceRule,
    costPerItem: costPerItemRule,
    compareAtPrice: compareAtPriceRule,
    quantity: quantityRule,
    sku: skuRule,
    barcode: barcodeRule,
  })
);
