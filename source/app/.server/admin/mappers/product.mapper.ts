import {Category, Product, ProductTranslation} from '@prisma/client';
import {TProductDto, TProductTranslateDto} from '~/.server/admin/dto/product.dto';
import {categoryMapper} from '~/.server/admin/mappers/category.mapper';

export type ProductWithRelations = Product & {
  category: Category | null;
  translations: ProductTranslation[];
};

export const productMapper = (product: ProductWithRelations): TProductDto => {
  return {
    id: String(product.id),
    slug: product.slug,
    price: String(product.price),
    costPerItem: String(product.costPerItem),
    compareAtPrice: String(product.compareAtPrice),
    quantity: String(product.quantity),
    sku: product.sku,
    barcode: product.barcode,
    status: product.status,
    avgRate: String(product.avgRate),
    totalReviews: String(product.totalReviews),
    categoryId: product.categoryId ? String(product.categoryId) : null,
    category: product.category ? categoryMapper(product.category) : null,
    translations: product.translations.map(productTranslateMapper),
    createdAt: product.createdAt.toJSON(),
    updatedAt: product.updatedAt.toJSON(),
    deletedAt: product.deletedAt ? product.deletedAt.toJSON() : null,
  };
};

export const productTranslateMapper = (translation: ProductTranslation): TProductTranslateDto => {
  return {
    title: translation.title,
    description: translation.description,
    language: translation.language,
  };
};
