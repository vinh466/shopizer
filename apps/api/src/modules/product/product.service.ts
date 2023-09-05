import { prisma } from "@shopizer/helpers/prisma.helper";
import CreateProductDto from "./dto/createProduct.dto";

class ProductService {
  public product = prisma.product;

  public async create(data: CreateProductDto) {
    return await this.product.create({
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
    return await this.product.findUnique({
      where: {
        id,
      },
    });
  }

  public async find() {
    return this.product.findMany();
  }

  public async findById(id: string) {
    return this.product.findUnique({ where: { id } });
  }

  public async findByIdAndUpdate(id: string, data: any) {
    return this.product.update({
      data,
      where: { id },
    });
  }

  public async findByIdAndDelete(id: string) {
    return this.product.delete({
      where: { id },
    });
  }
}

export default ProductService;
