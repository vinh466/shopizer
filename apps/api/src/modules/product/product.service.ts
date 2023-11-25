import { prisma } from "@shopizer/helpers/prisma.helper";
import CreateProductDto, {
  ModelList,
  TierVariation,
} from "./dto/createProduct.dto";
import { query } from "express";
import { $Enums, Prisma } from "@prisma/client";
import CategoryInvalidException from "./exceptions/CategoryInvalidException";
import { PRODUCT_STATUS } from "@shopizer/constants/product.constant";

class ProductService {
  protected prisma = prisma;

  // TODO need modification if variant is more complex (currently 2) (ideal: recursive)
  // TODO need to be clear about type in this function
  getVariation(
    variation: TierVariation[],
    modelList: ModelList[]
  ): {
      id?: string
    price: number;
    stock: number;
    variation: any;
    name: string;
    variantId?: string;
  }[] {
    const model = modelList.flat();

    const flatVariation = variation.reduce((acc, item) => {
      const { name, options } = item;
      const b = options.map((option) => {
        return {
          name,
          option,
        };
      });
      return [...acc, b];
    }, []);
    const variationMix = [];
    console.log(flatVariation);
    const [variation1, variation2] = flatVariation; // Todo: need to be recursive
    console.log(variation1, variation2)
    variation1.forEach((item, index1) => {
      if (variation2?.length) {
        variation2.forEach((item2, index2) => {
          const modelListIndex = index1 * variation2.length + index2;
          variationMix.push({
            ...model[modelListIndex],
            variation: [item, item2],
            name: `${item.option}-${item2.option}`,
          });
        });
      } else {
        variationMix.push({
          ...model[index1],
          variation: [item],
          name: `${item.option}`,
        });
      }
    });

    return variationMix;
  }
  public async create(data: CreateProductDto, sellerId: string) {
    // console.log("crate", data);
    const {
      category,
      description,
      detailList,
      name,
      price,
      stock,
      productImage,
      productImageDesc,
      modelList,
      tierVariation,
    } = data;

    const hasVariation = tierVariation?.length > 0 && modelList?.length > 0;
    const productVariant = hasVariation
      ? this.getVariation(tierVariation, modelList)
      : [
        {
          price,
          stock,
          variation: [],
          name: "default",
        },
      ];

    console.log(productVariant);

    const categoryId = category.find((item) => item.isLeaf)?.value;
    if (!categoryId) throw new CategoryInvalidException();

    const result = await this.prisma.product.create({
      data: {
        Seller: {
          connect: {
            id: sellerId,
          },
        },
        name,
        description,
        image: productImage[0].name,
        Category: {
          connect: {
            id: categoryId,
          },
        },
        imageDesc: productImageDesc?.map((item) => item.name) || [],
        detailList: detailList as any,
        variationConfig: {
          price,
          stock,
          modelList,
          tierVariation,
        } as any,
        ProductVariant: {
          createMany: {
            data: productVariant.map((item) => {
              return {
                price: item.price,
                stock: item.stock,
                variationName: item.name,
                variation: item.variation,
              };
            }),
          },
        },
      },
      include: {
        ProductVariant: true,
      },
    });
    await this.prisma.seller.update({
      where: {
        id: sellerId
      },
      data: {
        addNewProductAt: new Date()
      }
    })
    return result
  }

  public async update(id: string, data: CreateProductDto, sellerId: string) {

    console.log("update", data)
    const {
      category,
      description,
      detailList,
      name,
      price,
      stock,
      productImage,
      productImageDesc,
      modelList,
      tierVariation,
    } = data;

    const hasVariation = tierVariation?.length > 0 && modelList?.length > 0;
    const productVariant = hasVariation
      ? this.getVariation(tierVariation, modelList)
      : [
        {
          id: data?.productVariantId,
          price,
          stock,
          variation: [],
          name: "default",
        },
      ];
    const updateProductVariant = productVariant.filter(item => item.id)
    const newProductVariant = productVariant.filter(item => !item.id)
    console.log(productVariant)
    console.log(updateProductVariant)
    // if()

    const categoryId = category.find((item) => item.isLeaf)?.value;
    if (!categoryId) throw new CategoryInvalidException();


    const results = await prisma.$transaction(updateProductVariant.map(item => {
      return this.prisma.productVariant.update({
        where: {
          id: item.id
        },
        data: {
          price: item.price,
          stock: item.stock,
          variationName: item.name,
          variation: item.variation,
        }
      })
    }));
    console.log(results)

    const result = await this.prisma.product.update({
      where: {
        id: id
      },
      data: {
        name,
        description,
        image: productImage[0].name,
        Category: {
          connect: {
            id: categoryId,
          },
        },
        imageDesc: productImageDesc?.map((item) => item.name) || [],
        detailList: detailList as any,
        variationConfig: {
          price,
          stock,
          modelList,
          tierVariation,
        } as any,
        ProductVariant: {
          createMany: {
            data: newProductVariant.map((item) => {
              return {
                price: item.price,
                stock: item.stock,
                variationName: item.name,
                variation: item.variation,
              };
            }),
          },
        },
      },
      include: {
        ProductVariant: true,
      },
    });

    await this.prisma.seller.update({
      where: {
        id: sellerId
      },
      data: {
        addNewProductAt: new Date()
      }
    })

    return result
  }

  public async findOne({ id }: { id: string }) {
    return await this.prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  public async findSellerListProductAll({
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
    const query: Prisma.SellerFindManyArgs = {
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
      where: {},
      include: {
        products: true,
        user: true,
      },
    };
    const [results, count] = await prisma.$transaction([
      this.prisma.seller.findMany(query),
      prisma.seller.count({ where: query.where }),
    ]);
    return {
      pageSize,
      currentPage,
      total: count,
      results,
    };
  }

  public async findAll({
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
      include: {
        ProductVariant: true,
        Seller: true,
        Auction: true,
        Category: true, 
      },
      where: {},
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

  async productSellerGroup({
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


    const query: Prisma.SellerFindManyArgs = {
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
      include: {
        pickupAddress: true,
        products: {
          include: {
            ProductVariant: true,
            Category: true,
          },
          orderBy: {
            updatedAt: 'desc'
          }
        },
        user: true,
      },
      where: {
        products: {
          some: {
            status: {
              equals: $Enums.ProductStatus.ACTIVE
            }
          }
        },
        addNewProductAt: {
          not: null
        }
      },
      orderBy: {
        addNewProductAt: 'desc'
      }
    };
    const [results, count] = await prisma.$transaction([
      this.prisma.seller.findMany(query),
      prisma.seller.count({ where: query.where }),
    ]);


    return {
      pageSize,
      currentPage,
      total: count,
      results: results,
    };
  }

  public async sellerFind(
    {
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
      filter?: {
        listType?: string
      };
    } = {},
    sellerId: string
  ) {
    const whereQuery: Prisma.ProductWhereInput = { sellerId: sellerId, }
    if (Object.values(PRODUCT_STATUS).includes(filter?.listType as any)) {
      whereQuery['status'] = {
        equals: filter.listType as $Enums.ProductStatus
      }
    }
    const query: Prisma.ProductFindManyArgs = {
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
      include: {
        ProductVariant: true,
        OrderItem: {
          include: {
            order: true,
          }
        }
      },
      where: whereQuery,
      orderBy: {
        createdAt: 'desc'
      }
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
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        Seller: true,
        ProductVariant: true,
        OrderItem: { include: { order: true } },
        Category: {
          include: {
            products: {
              where: {
                status: PRODUCT_STATUS.ACTIVE,
                id: {
                  not: id
                }
              },
            },
            parent: {
              include: {
                parent: {
                  include: {
                    parent: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  public async findByIdAndUpdate(id: string, data: any) {
    return this.prisma.product.update({
      data,
      where: { id },
    });
  }

  public async findByIdAndDelete(id: string) {
    const [results, count] = await prisma.$transaction([
      this.prisma.productVariant.deleteMany({
        where: {
          productId: id,
        },
      }),
      this.prisma.product.delete({
        where: { id },
      }),
    ]);

    return results;
  }
}

export default ProductService;
