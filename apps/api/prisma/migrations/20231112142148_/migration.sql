/*
  Warnings:

  - You are about to drop the column `city` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `recipient` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `zipCode` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Store` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `detaul` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `districtCode` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provinceCode` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wardCode` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "city",
DROP COLUMN "phoneNumber",
DROP COLUMN "recipient",
DROP COLUMN "state",
DROP COLUMN "street",
DROP COLUMN "zipCode",
ADD COLUMN     "detaul" TEXT NOT NULL,
ADD COLUMN     "districtCode" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "provinceCode" TEXT NOT NULL,
ADD COLUMN     "sellerId" TEXT,
ADD COLUMN     "wardCode" TEXT NOT NULL,
ALTER COLUMN "country" SET DEFAULT 'vietnam';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "address",
DROP COLUMN "phone";

-- DropTable
DROP TABLE "Store";

-- CreateTable
CREATE TABLE "Seller" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Seller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Administrative_regions" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "name_en" VARCHAR(255) NOT NULL,
    "code_name" VARCHAR(255),
    "code_name_en" VARCHAR(255),

    CONSTRAINT "Administrative_regions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Administrative_units" (
    "id" INTEGER NOT NULL,
    "full_name" VARCHAR(255),
    "full_name_en" VARCHAR(255),
    "short_name" VARCHAR(255),
    "short_name_en" VARCHAR(255),
    "code_name" VARCHAR(255),
    "code_name_en" VARCHAR(255),

    CONSTRAINT "Administrative_units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Districts" (
    "code" VARCHAR(20) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "name_en" VARCHAR(255),
    "full_name" VARCHAR(255),
    "full_name_en" VARCHAR(255),
    "code_name" VARCHAR(255),
    "province_code" VARCHAR(20),
    "administrative_unit_id" INTEGER,

    CONSTRAINT "Districts_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Provinces" (
    "code" VARCHAR(20) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "name_en" VARCHAR(255),
    "full_name" VARCHAR(255) NOT NULL,
    "full_name_en" VARCHAR(255),
    "code_name" VARCHAR(255),
    "administrative_unit_id" INTEGER,
    "administrative_region_id" INTEGER,

    CONSTRAINT "Provinces_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Wards" (
    "code" VARCHAR(20) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "name_en" VARCHAR(255),
    "full_name" VARCHAR(255),
    "full_name_en" VARCHAR(255),
    "code_name" VARCHAR(255),
    "district_code" VARCHAR(20),
    "administrative_unit_id" INTEGER,

    CONSTRAINT "Wards_pkey" PRIMARY KEY ("code")
);

-- CreateIndex
CREATE INDEX "idx_districts_province" ON "Districts"("province_code");

-- CreateIndex
CREATE INDEX "idx_districts_unit" ON "Districts"("administrative_unit_id");

-- CreateIndex
CREATE INDEX "idx_provinces_region" ON "Provinces"("administrative_region_id");

-- CreateIndex
CREATE INDEX "idx_provinces_unit" ON "Provinces"("administrative_unit_id");

-- CreateIndex
CREATE INDEX "idx_wards_district" ON "Wards"("district_code");

-- CreateIndex
CREATE INDEX "idx_wards_unit" ON "Wards"("administrative_unit_id");

-- AddForeignKey
ALTER TABLE "Seller" ADD CONSTRAINT "Seller_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_districtCode_fkey" FOREIGN KEY ("districtCode") REFERENCES "Districts"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_provinceCode_fkey" FOREIGN KEY ("provinceCode") REFERENCES "Provinces"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_wardCode_fkey" FOREIGN KEY ("wardCode") REFERENCES "Wards"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Districts" ADD CONSTRAINT "Districts_administrative_unit_id_fkey" FOREIGN KEY ("administrative_unit_id") REFERENCES "Administrative_units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Districts" ADD CONSTRAINT "Districts_province_code_fkey" FOREIGN KEY ("province_code") REFERENCES "Provinces"("code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Provinces" ADD CONSTRAINT "Provinces_administrative_region_id_fkey" FOREIGN KEY ("administrative_region_id") REFERENCES "Administrative_regions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Provinces" ADD CONSTRAINT "Provinces_administrative_unit_id_fkey" FOREIGN KEY ("administrative_unit_id") REFERENCES "Administrative_units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Wards" ADD CONSTRAINT "Wards_administrative_unit_id_fkey" FOREIGN KEY ("administrative_unit_id") REFERENCES "Administrative_units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Wards" ADD CONSTRAINT "Wards_district_code_fkey" FOREIGN KEY ("district_code") REFERENCES "Districts"("code") ON DELETE NO ACTION ON UPDATE NO ACTION;
