/*
  Warnings:

  - You are about to drop the column `productId` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `productvariantId` on the `OrderItem` table. All the data in the column will be lost.
  - Added the required column `productVariantId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_productvariantId_fkey";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "productId",
DROP COLUMN "productvariantId",
ADD COLUMN     "productVariantId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "ProductVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
