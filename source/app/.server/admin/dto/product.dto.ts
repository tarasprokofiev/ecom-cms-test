import type {Product, ProductTranslation} from '@prisma/client';
import {TCategoryDto} from '~/.server/admin/dto/category.dto';

export type TProductTranslateDto = Pick<ProductTranslation, 'title' | 'description' | 'language'>;

type ExcludedField = 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'price' |
  'costPerItem' | 'compareAtPrice' | 'quantity' | 'avgRate' | 'totalReviews' | 'categoryId';
export type TProductDto = Omit<Product, ExcludedField> & {
  id: string;
  price: string;
  costPerItem: string;
  compareAtPrice: string;
  quantity: string;
  avgRate: string;
  totalReviews: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  categoryId: string | null;
  category: TCategoryDto | null;
  translations: TProductTranslateDto[];
}
