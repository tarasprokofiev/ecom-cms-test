-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('ACTIVE', 'DRAFT', 'ARCHIVED');

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "costPerItem" INTEGER NOT NULL,
    "compareAtPrice" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "sku" TEXT,
    "barcode" TEXT,
    "status" "ProductStatus" NOT NULL DEFAULT 'ACTIVE',
    "avgRate" INTEGER NOT NULL,
    "totalReviews" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "categoryId" INTEGER,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE INDEX "ProductStatusIndex" ON "Product"("status");

-- CreateIndex
CREATE INDEX "ProductCategoryIdIndex" ON "Product"("categoryId");

-- CreateIndex
CREATE INDEX "ProductCreatedAtIndex" ON "Product"("createdAt");

-- CreateIndex
CREATE INDEX "ProductUpdatedAtIndex" ON "Product"("updatedAt");

-- CreateIndex
CREATE INDEX "ProductDeletedAtIndex" ON "Product"("deletedAt");

-- CreateIndex
CREATE INDEX "ProductSearchIndex" ON "Product"("title", "slug", "sku", "barcode");

-- CreateIndex
CREATE INDEX "ProductPriceIndex" ON "Product"("price");

-- CreateIndex
CREATE INDEX "ProductCompareAtPriceIndex" ON "Product"("compareAtPrice");

-- CreateIndex
CREATE INDEX "ProductAvgRateIndex" ON "Product"("avgRate");

-- CreateIndex
CREATE INDEX "ProductTotalReviewsIndex" ON "Product"("totalReviews");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
