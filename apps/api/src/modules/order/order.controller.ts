import { Controller, Get } from "@shopizer/decorators";
import { Response } from "express";

@Controller("order")
export class OrderController {
  @Get("get")
  getData(req: any, res: Response) {
    return res.status(200).json({ message: "Hello World" });
  }
}
