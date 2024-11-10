import { Prisma } from "@prisma/client";
import { prisma } from "@shopizer/helpers/prisma.helper";

class OrderService {
  public prisma = prisma;

  async createOrder(payload: any) {
    const { orderItems, buyer } = payload
    orderItems.map(async (item: any) => {
      const { seller, cartItems } = item
      const variantItems = cartItems.reduce((acc: any, orderItem: any,) => {
        const { cartVariants } = orderItem
        cartVariants.forEach((variant: any) => {
          acc.push({
            productVariantId: variant?.id,
            quantity: variant?.quantity || 1,
            price: variant?.price || 10000,
          })
        })
        return acc
      }, [])

      console.log(variantItems)
    })

    const results = await prisma.$transaction(
      orderItems.map((item: any) => {
        const { seller, cartItems } = item
        console.log(seller)

        return this.prisma.order.create({
          data: {
            totalAmount: 0,
            paymentMethod: 'COD',
            shippingAddress: '',
            shippingCost: 0,
            orderItemsJson: payload,
            DeliveryAddress: {
              create: {
                detail: buyer?.address?.detail,
                districtCode: buyer?.address?.district,
                provinceCode: buyer?.address?.province,
                wardCode: buyer?.address?.ward,
                phone: buyer?.address?.phone,
              }
            },
            items: {
              createMany: {
                data: cartItems.reduce((acc: any, orderItem: any,) => {
                  const { cartVariants } = orderItem
                  cartVariants.forEach((variant: any) => {
                    acc.push({
                      productVariantId: variant?.id,
                      quantity: variant?.quantity || 1,
                      price: variant?.price || 10000,
                    })
                  })
                  return acc
                }, [])
              }
            },
            seller: {
              connect: {
                id: seller?.id
              }
            },
            user: {
              connect: {
                id: buyer?.userId
              }
            }
          },
          include: {
            items: true,
            seller: true,
            user: true
          }
        });
      })
    );
    return results
  }

  async getSellerOrderList(
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
    sellerId: string) {
    const whereQuery: Prisma.OrderWhereInput = { sellerId: sellerId, };
    if (filter?.listType) {
      whereQuery['status'] = {
        equals: filter.listType as any
      }
    }
    const query: Prisma.OrderFindManyArgs = {
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
      include: {
        items: true,
        seller: {
          include: {
            pickupAddress: {
              include: {
                district: true,
                province: true,
                ward: true,
              }
            },

          }
        },
        user: true,
        DeliveryAddress: {
          include: {
            district: true,
            province: true,
            ward: true,
          }
        }
      },
      where: whereQuery,
      orderBy: {
        updatedAt: 'desc'
      }
    };
    const [results, count] = await prisma.$transaction([
      this.prisma.order.findMany(query),
      prisma.order.count({ where: query.where }),
    ]);
    return {
      pageSize,
      currentPage,
      total: count,
      results,
    };
  }
  async buyerCancelOrder(id: string) {
    return this.prisma.order.update({
      where: {
        id
      },
      data: {
        status: 'CANCELED'
      }
    })
  }

  async getBuyerOrderList(
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
    userId: string) {
    const whereQuery: Prisma.OrderWhereInput = { userId: userId, };
    if (filter?.listType) {
      whereQuery['status'] = {
        equals: filter.listType as any
      }
    }
    const query: Prisma.OrderFindManyArgs = {
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
      include: {
        items: true,
        seller: {
          include: {
            pickupAddress: {
              include: {
                district: true,
                province: true,
                ward: true,
              }
            },

          }
        },
        user: true,
        DeliveryAddress: {
          include: {
            district: true,
            province: true,
            ward: true,
          }
        }
      },
      where: whereQuery,
      orderBy: {
        updatedAt: 'desc'
      }
    };
    const [results, count] = await prisma.$transaction([
      this.prisma.order.findMany(query),
      prisma.order.count({ where: query.where }),
    ]);
    return {
      pageSize,
      currentPage,
      total: count,
      results,
    };
  }
  async sellerConfirmOrder(orderId: string) {
    return this.prisma.order.update({
      where: {
        id: orderId
      },
      data: {
        status: 'PROCESSING'
      }
    })
  }

  async sellerShippingConfirmOrder(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: {
        id: orderId
      },
      include: {
        items: true
      }
    })
    const items = order?.items || []
    items.map(async (item: any) => {
      const variant = await this.prisma.productVariant.findUnique({
        where: {
          id: item?.productVariantId
        }
      })
      if (variant?.stock) {
        await this.prisma.productVariant.update({
          where: {
            id: item?.productVariantId
          },
          data: {
            stock: variant?.stock - item?.quantity
          }
        })
      }
    })
    const result = await this.prisma.order.update({
      where: {
        id: orderId
      },
      data: {
        status: 'SHIPPED'
      }
    })
    return { result, order }
  }

  async buyerReceivedOrder(orderId: string) {
    return this.prisma.order.update({
      where: {
        id: orderId
      },
      data: {
        status: 'DELIVERED'
      }
    })
  }
}

export default OrderService;
