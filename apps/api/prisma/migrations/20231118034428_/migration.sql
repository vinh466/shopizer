/*
  Warnings:

  - You are about to drop the column `variations` on the `Product` table. All the data in the column will be lost.
  - The `detailList` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "variations",
DROP COLUMN "detailList",
ADD COLUMN     "detailList" JSONB;
