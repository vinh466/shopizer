/*
  Warnings:

  - You are about to drop the column `districtsCode` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `provincesCode` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `wardsCode` on the `Address` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "SellerStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED', 'BLOCKED');

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_districtsCode_fkey";

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_provincesCode_fkey";

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_wardsCode_fkey";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "districtsCode",
DROP COLUMN "provincesCode",
DROP COLUMN "wardsCode",
ADD COLUMN     "districtCode" VARCHAR(20),
ADD COLUMN     "provinceCode" VARCHAR(20),
ADD COLUMN     "wardCode" VARCHAR(20);

-- AlterTable
ALTER TABLE "Seller" ADD COLUMN     "image" TEXT,
ADD COLUMN     "status" "SellerStatus" NOT NULL DEFAULT 'PENDING';

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_districtCode_fkey" FOREIGN KEY ("districtCode") REFERENCES "Districts"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_provinceCode_fkey" FOREIGN KEY ("provinceCode") REFERENCES "Provinces"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_wardCode_fkey" FOREIGN KEY ("wardCode") REFERENCES "Wards"("code") ON DELETE SET NULL ON UPDATE CASCADE;
