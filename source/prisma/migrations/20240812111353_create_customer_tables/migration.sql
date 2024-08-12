-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerAddress" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "company" TEXT,
    "address" TEXT NOT NULL,
    "apartment" TEXT,
    "city" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerAddress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE INDEX "CustomerCreatedAtIndex" ON "Customer"("createdAt");

-- CreateIndex
CREATE INDEX "CustomerUpdatedAtIndex" ON "Customer"("updatedAt");

-- CreateIndex
CREATE INDEX "CustomerDeletedAtIndex" ON "Customer"("deletedAt");

-- CreateIndex
CREATE INDEX "CustomerSearchIndex" ON "Customer"("firstName", "lastName", "email", "phone");

-- CreateIndex
CREATE INDEX "CustomerAddressCustomerIdIndex" ON "CustomerAddress"("customerId");

-- CreateIndex
CREATE INDEX "CustomerAddressSearchIndex" ON "CustomerAddress"("firstName", "lastName", "company", "address", "phone");

-- CreateIndex
CREATE INDEX "UserCreatedAtIndex" ON "User"("createdAt");

-- CreateIndex
CREATE INDEX "UserUpdatedAtIndex" ON "User"("updatedAt");

-- CreateIndex
CREATE INDEX "UserDeletedAtIndex" ON "User"("deletedAt");

-- CreateIndex
CREATE INDEX "UserRoleIndex" ON "User"("role");

-- CreateIndex
CREATE INDEX "UserFullNameIndex" ON "User"("fullName");

-- AddForeignKey
ALTER TABLE "CustomerAddress" ADD CONSTRAINT "CustomerAddress_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
