/*
  Warnings:

  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Product` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "ProductSearchIndex";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "description",
DROP COLUMN "title";

-- CreateTable
CREATE TABLE "ProductTranslation" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "language" "Language" NOT NULL DEFAULT 'EN',
    "productId" INTEGER,

    CONSTRAINT "ProductTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProductTranslationSearchIndex" ON "ProductTranslation"("title");

-- CreateIndex
CREATE INDEX "ProductTranslationProductIdIndex" ON "ProductTranslation"("productId");

-- CreateIndex
CREATE INDEX "ProductTranslationLanguageIndex" ON "ProductTranslation"("language");

-- CreateIndex
CREATE INDEX "ProductSearchIndex" ON "Product"("sku", "barcode");

-- AddForeignKey
ALTER TABLE "ProductTranslation" ADD CONSTRAINT "ProductTranslation_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
