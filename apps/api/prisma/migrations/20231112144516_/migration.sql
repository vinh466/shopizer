/*
  Warnings:

  - You are about to drop the column `detaul` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `districtCode` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `provinceCode` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `wardCode` on the `Address` table. All the data in the column will be lost.
  - Added the required column `detail` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_districtCode_fkey";

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_provinceCode_fkey";

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_userId_fkey";

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_wardCode_fkey";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "detaul",
DROP COLUMN "districtCode",
DROP COLUMN "provinceCode",
DROP COLUMN "wardCode",
ADD COLUMN     "detail" TEXT NOT NULL,
ADD COLUMN     "districtsCode" VARCHAR(20),
ADD COLUMN     "provincesCode" VARCHAR(20),
ADD COLUMN     "wardsCode" VARCHAR(20),
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_districtsCode_fkey" FOREIGN KEY ("districtsCode") REFERENCES "Districts"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_provincesCode_fkey" FOREIGN KEY ("provincesCode") REFERENCES "Provinces"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_wardsCode_fkey" FOREIGN KEY ("wardsCode") REFERENCES "Wards"("code") ON DELETE SET NULL ON UPDATE CASCADE;
