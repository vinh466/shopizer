import { PrismaClient } from "@prisma/client";
import { prisma } from "@shopizer/helpers/prisma.helper";
import { Response } from "express";

export class ProductCategoryService {
  protected prisma = prisma;

  async getTree() {
    return await this.prisma.category.findMany({
      where: {
        parentId: null,
      },
      include: {
        children: {
          include: {
            children: {
              include: {
                children: {
                  include: {
                    children: {
                      include: {
                        children: {
                          include: {
                            children: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }
  async getList() {
    return await this.prisma.category.findMany({});
  }
}
