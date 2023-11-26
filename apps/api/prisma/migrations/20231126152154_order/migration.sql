/*
  Warnings:

  - You are about to drop the column `returnStatus` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the `_ProductVariantOrder` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productvariantId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "_ProductVariantOrder" DROP CONSTRAINT "_ProductVariantOrder_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductVariantOrder" DROP CONSTRAINT "_ProductVariantOrder_B_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "productVariantId" TEXT;

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "returnStatus",
ADD COLUMN     "productvariantId" TEXT NOT NULL,
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "productId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProductVariant" ADD COLUMN     "orderItemId" TEXT;

-- DropTable
DROP TABLE "_ProductVariantOrder";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "ProductVariant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productvariantId_fkey" FOREIGN KEY ("productvariantId") REFERENCES "ProductVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
