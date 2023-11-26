import { Controller, Get, Post } from "@shopizer/decorators";
import { Response } from "express";
import OrderService from "./order.service";

@Controller("order")
export class OrderController {
  orderService = new OrderService()

  @Get("get")
  getData(req: any, res: Response) {
    return res.status(422).json({ message: "Hello World" });
  }
  @Post("/")
  async createOrder(req: any, res: Response) {
    const payload = req.body;

    try {
      const result = await this.orderService.createOrder(payload)
      return res.status(422).json({ results: result });
    }
    catch (error) {
      console.error(error)
      return res.status(400).json({ message: error.message });
    }
  }
}
