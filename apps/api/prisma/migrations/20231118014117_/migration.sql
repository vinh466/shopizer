/*
  Warnings:

  - You are about to drop the column `variationName` on the `ProductVariant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "stock" INTEGER,
ALTER COLUMN "price" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProductVariant" DROP COLUMN "variationName";
