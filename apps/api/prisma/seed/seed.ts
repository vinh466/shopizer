import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import { categories } from "./product-category-data";
import { v4 as uuidv4 } from "uuid";
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'


const prisma = new PrismaClient();

function getCategories(categories, result: any = [], parentId: string | null = null) {
  categories.map((category) => {
    const id = uuidv4();
    if (category.children.length > 0) {
      getCategories(category.children, result, id);
    }
    result.push({
      id,
      parentId,
      name: category.name,
      displayName: category.display_name,
      isProhibit: category.is_prohibit,
    });
  });
  return result;
}

async function sendCategories() {
  const categoryCount = await prisma.category.count();
  console.log("categoryCount", categoryCount)
  if (categoryCount === 0) {
    const createData = getCategories(categories);
    const createMany = await prisma.category.createMany({
      data: createData,
    });
    console.log("create categoryCount", createMany);
  }
}

async function sendAdministrativeRegions() {
  const administrative_regionsCount = await prisma.administrative_regions.count();
  console.log("administrative_regionsCount", administrative_regionsCount)
  if (administrative_regionsCount === 0) {
    const fs = require("fs");
    const administrative_regions_json = fs.readFileSync("prisma/seed/administrative_regions.json", "utf8");
    const administrative_regions = JSON.parse(administrative_regions_json) as [];

    const createMany = await prisma.administrative_regions.createMany({
      data: administrative_regions
    });
    console.log("create administrative_regionsCount", createMany);
  }
}

async function sendAdministrativeUnits() {
  const administrative_unitsCount = await prisma.administrative_units.count();
  console.log("administrative_unitsCount", administrative_unitsCount)
  if (administrative_unitsCount === 0) {
    const fs = require("fs");
    const administrative_units_json = fs.readFileSync("prisma/seed/administrative_units.json", "utf8");
    const administrative_units = JSON.parse(administrative_units_json) as [];

    const createMany = await prisma.administrative_units.createMany({
      data: administrative_units
    });
    console.log("create administrative_unitsCount", createMany);
  }

}

async function sendProvinces() {
  const provincesCount = await prisma.provinces.count();
  console.log("provincesCount", provincesCount)
  if (provincesCount === 0) {
    const fs = require("fs");
    const provinces_json = fs.readFileSync("prisma/seed/provinces.json", "utf8");
    const provinces = JSON.parse(provinces_json) as [];

    const createMany = await prisma.provinces.createMany({
      data: provinces
    });
    console.log("create provincesCount", createMany);
  }
}

async function sendDistricts() {
  const districtsCount = await prisma.districts.count();
  console.log("districtsCount", districtsCount)
  if (districtsCount === 0) {
    const fs = require("fs");
    const districts_json = fs.readFileSync("prisma/seed/districts.json", "utf8");
    const districts = JSON.parse(districts_json) as [];

    const createMany = await prisma.districts.createMany({
      data: districts
    });
    console.log("create districtsCount", createMany);
  }
}

async function sendWards() {
  const wardsCount = await prisma.wards.count();
  console.log("wardsCount", wardsCount)
  if (wardsCount === 0) {
    const fs = require("fs");
    const wards_json = fs.readFileSync("prisma/seed/wards.json", "utf8");
    const wards = JSON.parse(wards_json) as [];
    const createMany = await prisma.wards.createMany({
      data: wards
    });
    console.log("create wardsCount", createMany);
  }
}

const main = async () => {
  await sendCategories();

  await sendAdministrativeRegions();

  await sendAdministrativeUnits();

  await sendProvinces();

  await sendDistricts();

  await sendWards();
};

main();
