import { PrismaClient } from "@prisma/client";
import { prisma } from "@shopizer/helpers/prisma.helper";
import { Response } from "express";
import { delay } from "lodash";

export class SummaryService {
  protected prisma = prisma;
  saleViolationData = [
    {
      id: "1",
      criteria: "Sản phẩm bị khóa/xóa",
      shopValue: 0,
      targetValue: 0,
    },
    // {
    //   id: "2",
    //   criteria: "Tỉ lệ hàng đặt trước",
    //   shopValue: 0 + "%",
    //   targetValue: "≤10.00%",
    // },
    {
      id: "3",
      criteria: "Các vi phạm khác",
      shopValue: 0,
      targetValue: "0",
    },
  ];
  orderManagementData = [
    {
      id: "1",
      criteria: "Tỉ lệ đơn không thành công ",
      shopValue: 0 + "%",
      targetValue: "<10.00%",
    },
    // {
    //   id: "2",
    //   criteria: "Tỷ lệ giao hàng trễ",
    //   shopValue: 0 + "%",
    //   targetValue: "<10.00%",
    // },
    {
      id: "3",
      criteria: "Thời gian chuẩn bị hàng",
      shopValue: 0,
      targetValue: "<1.50 days",
    },
  ];
  customerCareData = [
    {
      id: "1",
      criteria: "Tỉ lệ phản hồi",
      shopValue: 57 + "%",
      targetValue: "≥80.00%",
    },
    {
      id: "2",
      criteria: "Thời gian phản hồi",
      shopValue: 0,
      targetValue: "<0.50 days",
    },
  ];
  buyerSatisfactionData = [
    {
      id: "1",
      criteria: "Đánh giá Shop",
      shopValue: 0,
      targetValue: "≥4.00/5",
    },
  ];
  async getDashboard(sellerId: string) {
    const orderCount = await this.prisma.order.count({
      where: {
        status: "PENDING",
        sellerId
      },
    })

    const orderProcessingCount = await this.prisma.order.count({
      where: {
        status: "PROCESSING",
        sellerId

      },
    })

    const orderShippingCount = await this.prisma.order.count({
      where: {
        status: "SHIPPED",
        sellerId

      },
    })

    const orderDoneCount = await this.prisma.order.count({
      where: {
        status: "DELIVERED",
        sellerId
      },
    })

    const orderCanceledCount = await this.prisma.order.count({
      where: {
        status: "CANCELED",
        sellerId
      },
    })

    const orderViolateCount = await this.prisma.product.count({
      where: {
        status: "VIOLATE",
        sellerId
      },
    })


    const productCount = await this.prisma.product.count({
      where: {
        sellerId,
        status: "SOLD_OUT",
      },
    })



    return Promise.resolve([
      {
        title: 'Chờ Xác Nhận',
        value: orderCount,
      },
      {
        title: 'Chờ Lấy Hàng',
        value: orderProcessingCount,
      },
      {
        title: 'Dang giao hàng',
        value: orderShippingCount,
      },
      {
        title: 'Đã giao',
        value: orderDoneCount,
      },
      {
        title: 'Đơn Hủy',
        value: orderCanceledCount,
      },
      // {
      //   title: 'Trả Hàng/Hoàn Tiền Chờ Xử Lý',
      //   value: 100,
      // },
      {
        title: 'Sản Phẩm Bị Tạm Khóa',
        value: orderViolateCount,
      },
      {
        title: 'Sản Phẩm Hết Hàng',
        value: productCount,
      },
    ])
  }
  async getSaleViolation() {
    return this.saleViolationData;
  }
  async getOrderManagement() {

    const orderTotalCount = await this.prisma.order.count({
      where: {

      },
    })

    const orderCanceledCount = await this.prisma.order.count({
      where: {
        status: "CANCELED",

      },
    })
    console.log({ orderCanceledCount, orderTotalCount })
    const orderViolateCount = await this.prisma.product.count({
      where: {
        status: "VIOLATE",

      },
    })
    // return this.orderManagementData;
    return [
      {
        id: "1",
        criteria: "Tỉ lệ đơn không thành công ",
        shopValue: (orderCanceledCount / (orderTotalCount || 1) * 100).toFixed(2) + "%",
        targetValue: "<10.00%",
      },
      {
        id: "3",
        criteria: "Thời gian chuẩn bị hàng",
        shopValue: 0,
        targetValue: "<1.50 days",
      },
    ]
  }
  async getCustomerCare() {
    return this.customerCareData;
  }
  async getBuyerSatisfaction() {
    return this.buyerSatisfactionData;
  }
}
