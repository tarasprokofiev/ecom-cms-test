-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE INDEX "CategoryCreatedAtIndex" ON "Category"("createdAt");

-- CreateIndex
CREATE INDEX "CategoryUpdatedAtIndex" ON "Category"("updatedAt");

-- CreateIndex
CREATE INDEX "CategoryDeletedAtIndex" ON "Category"("deletedAt");

-- CreateIndex
CREATE INDEX "CategorySearchIndex" ON "Category"("title", "slug");
