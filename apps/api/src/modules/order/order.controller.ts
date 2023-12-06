import { Controller, Get, Patch, Post } from "@shopizer/decorators";
import { Request, Response } from "express";
import OrderService from "./order.service";
import { toInteger } from "lodash";
import authMiddleware from "@shopizer/middleware/auth.middleware";

@Controller("order")
export class OrderController {
  orderService = new OrderService()

  @Get("get")
  getData(req: any, res: Response) {
    return res.status(422).json({ message: "Hello World" });
  }
  @Post("/", authMiddleware)
  async createOrder(req: any, res: Response) {
    const payload = req.body;

    try {
      const result = await this.orderService.createOrder(payload)
      return res.status(201).json({ results: result });
    }
    catch (error) {
      console.error(error)
      return res.status(400).json({ message: error.message });
    }
  }
  @Get("buyer/list", authMiddleware)
  async getBuyerListOrder(request: Request, response: Response) {
    const id = request.user.id;
    const { search = "", currentPage = 1, pageSize = 10, listType } = request.query as { [key: string]: string }

    // return response.send({ listType })
    const order = await this.orderService.getBuyerOrderList({
      search,
      currentPage: toInteger(currentPage) || 1,
      pageSize: toInteger(pageSize) || 1,
      filter: {
        listType
      }
    }, id);
    response.json(order);
  }
  @Get("seller/list", authMiddleware)
  async getSellerListOrder(request: Request, response: Response) {
    const id = request.user.id;
    const { search = "", currentPage = 1, pageSize = 10, listType } = request.query as { [key: string]: string }

    // return response.send({ listType })
    const order = await this.orderService.getSellerOrderList({
      search,
      currentPage: toInteger(currentPage) || 1,
      pageSize: toInteger(pageSize) || 1,
      filter: {
        listType
      }
    }, id);
    response.json(order);
  }
  @Patch("seller/confirm", authMiddleware)
  async sellerConfirmOrder(request: Request, response: Response) {
    try {
      const orderId = request.body.id;
      const result = await this.orderService.sellerConfirmOrder(orderId);
      response.json({
        message: "Xác nhận đơn hàng thành công",
        result
      });
    } catch (error) {
      response.status(400).json({
        message: "Xác nhận đơn hàng không thành công, vui lòng thử lại sau.",
      });
    }
  }
  @Patch("seller/shipping-confirm", authMiddleware)
  async sellerShippingConfirmOrder(request: Request, response: Response) {
    try {
      const orderId = request.body.id;
      const result = await this.orderService.sellerShippingConfirmOrder(orderId);
      response.json({
        message: "Cập nhập đơn hàng thành công",
        result
      });
    } catch (error) {
      response.status(400).json({
        message: "Cập nhập đơn hàng không thành công, vui lòng thử lại sau.",
      });
    }
  }
  @Patch("buyer/cancel", authMiddleware)
  async buyerCancelOrder(request: Request, response: Response) {
    try {
      const orderId = request.body.id;
      const result = await this.orderService.buyerCancelOrder(orderId);
      response.json({
        message: "Hủy đơn hàng thành công",
        result
      });
    } catch (error) {
      response.status(400).json({
        message: "Hủy đơn hàng không thành công, vui lòng thử lại sau.",
      });
    }
  }
  @Patch("buyer/received", authMiddleware)
  async buyerReceivedOrder(request: Request, response: Response) {
    try {
      const orderId = request.body.id;
      const result = await this.orderService.buyerReceivedOrder(orderId);
      response.json({
        message: "Đã nhận hàng",
        result
      });
    } catch (error) {
      response.status(400).json({
        message: "Không thành công, vui lòng thử lại sau.",
      });
    }
  }

}
