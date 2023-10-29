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
    {
      id: "2",
      criteria: "Tỉ lệ hàng đặt trước",
      shopValue: 0 + "%",
      targetValue: "≤10.00%",
    },
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
    {
      id: "2",
      criteria: "Tỷ lệ giao hàng trễ",
      shopValue: 0 + "%",
      targetValue: "<10.00%",
    },
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

  async getSaleViolation() {
    return this.saleViolationData;
  }
  async getOrderManagement() {
    return this.orderManagementData;
  }
  async getCustomerCare() {
    return this.customerCareData;
  }
  async getBuyerSatisfaction() {
    return this.buyerSatisfactionData;
  }
}
