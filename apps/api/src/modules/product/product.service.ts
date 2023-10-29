import { prisma } from "@shopizer/helpers/prisma.helper";
import CreateProductDto from "./dto/createProduct.dto";
import { query } from "express";
import { Prisma } from "@prisma/client";

class ProductService {
  protected prisma = prisma;

  public async create(data: CreateProductDto) {
    return await this.prisma.product.create({
      data: {
        name: data.name,
        price: data.price,
        description: data.description,
        batches: {
          create: {
            stock: data.batches.stock,
            expirationDate: new Date(data.batches.expirationDate),
          },
        },
        ProductVariant: {
          createMany: {
            data: [
              {
                stock: 10,
                attributes: data.attributes as any,
                price: 10000,
              },
            ],
          },
        },
      },
      include: {
        batches: true,
        Category: true,
        inOutHistories: true,
        ProductVariant: true,
      },
    });
  }

  public async findOne({ id }: { id: string }) {
    return await this.prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  public async find({
    search = "",
    currentPage = 1,
    pageSize = 10,
    sort,
    filter,
  }: {
    search?: string;
    currentPage?: number;
    pageSize?: number;
    sort?: string;
    filter?: string;
  } = {}) {
    const query: Prisma.ProductFindManyArgs = {
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
    };
    const [results, count] = await prisma.$transaction([
      this.prisma.product.findMany(query),
      prisma.product.count({ where: query.where }),
    ]);
    return {
      pageSize,
      currentPage,
      total: count,
      results,
    };
  }

  public async findById(id: string) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  public async findByIdAndUpdate(id: string, data: any) {
    return this.prisma.product.update({
      data,
      where: { id },
    });
  }

  public async findByIdAndDelete(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}

export default ProductService;
