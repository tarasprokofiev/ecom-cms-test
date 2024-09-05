/*
  Warnings:

  - A unique constraint covering the columns `[productId,language]` on the table `ProductTranslation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ProductTranslationLanguageIndex";

-- DropIndex
DROP INDEX "ProductTranslationProductIdIndex";

-- CreateIndex
CREATE UNIQUE INDEX "ProductTranslation_productId_language_key" ON "ProductTranslation"("productId", "language");
