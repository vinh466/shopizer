/*
  Warnings:

  - You are about to drop the column `attributes` on the `ProductVariant` table. All the data in the column will be lost.
  - Added the required column `variation` to the `ProductVariant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "variations" JSONB;

-- AlterTable
ALTER TABLE "ProductVariant" DROP COLUMN "attributes",
ADD COLUMN     "variation" JSONB NOT NULL;
