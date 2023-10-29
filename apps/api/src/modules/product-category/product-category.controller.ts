import { PrismaClient } from "@prisma/client";
import { Controller, Get } from "@shopizer/decorators";
import { Response } from "express";
import { ProductCategoryService } from "./product-category.service";

@Controller("category")
export class ProductCategoryController {
  private productCategoryService = new ProductCategoryService();
  @Get("/list")
  async getList(req: any, res: Response) {
    const tree = req?.query?.tree;
    const category = tree
      ? await this.productCategoryService.getTree()
      : await this.productCategoryService.getList();
    res.send(category);
  }
}
