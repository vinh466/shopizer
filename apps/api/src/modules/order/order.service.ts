import { prisma } from "@shopizer/helpers/prisma.helper";

class OrderService {
  public prisma = prisma;

  async createOrder(payload: any) {
    return await this.prisma.order.create({
      data: {
        totalAmount: 0,
        paymentMethod: 'COD',
        shippingAddress: '',
        shippingCost: 0,
        orderItemsJson: payload,
        user: {
          connect: {
            id: "b9358612-e45c-49f5-a101-8c5df2a1c4e4"
          }
        }
      }
    });
  }

}

export default OrderService;
