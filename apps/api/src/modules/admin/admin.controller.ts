import { Controller, Get, Patch, Post } from "@shopizer/decorators";
import { Request, Response } from "express";
import AdminService from "./admin.service";
import { toInteger } from "lodash";
import authMiddleware from "@shopizer/middleware/auth.middleware";

@Controller("admin")
export class AdminController {
  adminService = new AdminService()

  @Get("seller/list", authMiddleware)
  async getData(req: any, res: Response) {
    const id = req.user.id;
    const { search = "", currentPage = 1, pageSize = 10, listType } = req.query as { [key: string]: string }

    // return response.send({ listType })
    const order = await this.adminService.getSellerList({
      search,
      currentPage: toInteger(currentPage) || 1,
      pageSize: toInteger(pageSize) || 1,
      filter: {
        listType
      }
    }, id);
    res.json(order);
  }
  @Patch("seller/change-status", authMiddleware)
  async changeSellerStatus(req: any, res: Response) {
    const id = req.user.id;
    const { sellerId, status } = req.body as { [key: string]: string }

    const json = await this.adminService.changeSellerStatus(sellerId, status as any)
    res.json(json);
  }
}
