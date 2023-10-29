import { PrismaClient } from "@prisma/client";
import { Controller, Get } from "@shopizer/decorators";
import { Response } from "express";
import { SummaryService } from "./summary.service";

@Controller("summary")
export class SummaryController {
  private summaryService = new SummaryService();

  @Get("/sale-violation")
  async getSaleViolation(req: any, res: Response) {
    const summary = await this.summaryService.getSaleViolation();
    res.json({
      results: summary,
    });
  }
  @Get("/order-management")
  async getOrderManagement(req: any, res: Response) {
    const summary = await this.summaryService.getOrderManagement();
    res.json({
      results: summary,
    });
  }
  @Get("/customer-care")
  async getCustomerCare(req: any, res: Response) {
    const summary = await this.summaryService.getCustomerCare();
    res.json({
      results: summary,
    });
  }
  @Get("/buyer-satisfaction")
  async getSaleViolationTotal(req: any, res: Response) {
    const summary = await this.summaryService.getBuyerSatisfaction();
    res.json({
      results: summary,
    });
  }
}
