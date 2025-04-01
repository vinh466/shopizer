import authMiddleware from "@shopizer/middleware/auth.middleware";
import RequestWithUser from "@shopizer/types/requestWithUser.interface";
import { Router, Request, Response, NextFunction } from "express";
import UserNotFoundException from "./exceptions/UserNotFoundException";
import NotAuthorizedException from "./exceptions/NotAuthorizedException";
import { Controller, Get, Patch, Post } from "@shopizer/decorators";
import UserService from "./user.service";
import { FileUploadMiddleware } from "@shopizer/middleware/file-update.middleware";

@Controller("user")
class UserController {
  userServices = new UserService();

  constructor() { }

  @Get("/profile", authMiddleware)
  async getUserById(request: Request, response: Response, next: NextFunction) {
    try {
      const id = request.user.id;
      const user = await this.userServices.findById(id);

      if (user) {
        response.send(user);
      } else {
        next(new UserNotFoundException(id));
      }
    } catch (error) {
      next(error);
    }
  }

  @Get("/admin/profile", authMiddleware)
  async getAdminById(request: Request, response: Response, next: NextFunction) {
    try {
      const id = request.user.id;
      const user = await this.userServices.findAdminById(id);

      if (user) {
        response.send(user);
      } else {
        next(new UserNotFoundException(id));
      }
    } catch (error) {
      next(error);
    }
  }
  @Get("/seller/profile", authMiddleware)
  async getSellerById(request: Request, response: Response, next: NextFunction) {
    try {
      const id = request.user.id;
      const user = await this.userServices.findSellerById(id);

      if (user) {
        response.send(user);
      } else {
        next(new UserNotFoundException(id));
      }
    } catch (error) {
      next(error);
    }
  }
  @Patch("/seller/profile", authMiddleware)
  async updateSellerProfile(request: Request, response: Response, next: NextFunction) {
    try {
      const payload = request.body;
      console.log(payload)
      const id = request.user.id;
      const result = await this.userServices.updateSellerProfile(payload);

      if (result) {
        response.send(result);
      } else {
        next(new UserNotFoundException(id));
      }
    } catch (error) {
      console.log(error)
      next(error);
    }
  }
  @Post(
    "/seller/image/update",
    authMiddleware,
    FileUploadMiddleware({
      fields: [{ name: "seller-avatar", maxCount: 1 }],
      dest: "images/seller",
      sizeLimit: 5,
    }) as any)
  async updateSellerImage(request: Request, response: Response, next: NextFunction) {
    const file = request.files?.["seller-avatar"]?.[0];
    if (file === undefined) {
      return response.status(400).json({
        error: true,
        message: "Tải file không thành công xin hãy thử lại!",
      });
    }
    return response.status(200).json({
      success: true,
      file,
    });
  }
}

export default UserController;
