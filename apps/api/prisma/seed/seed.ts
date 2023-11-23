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



const main = async () => {
  const categoryCount = await prisma.category.count();
  console.log("categoryCount", categoryCount)
  if (categoryCount === 0) {
    const createData = getCategories(categories);
    const createMany = await prisma.category.createMany({
      data: createData,
    });
    console.log("create categoryCount", createMany);
  }

  const administrative_regionsCount = await prisma.administrative_regions.count();
  const administrative_unitsCount = await prisma.administrative_units.count();
  const provinces = await prisma.provinces.count();
  const districts = await prisma.districts.count();
  const wards = await prisma.wards.count();

  console.log({
    administrative_regionsCount,
    administrative_unitsCount,
    provinces,
    districts,
    wards,
  })
  // console.log(JSON.stringify(show, null, 2));
};

main();
