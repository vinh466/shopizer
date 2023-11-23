import authMiddleware from "@shopizer/middleware/auth.middleware";
import RequestWithUser from "@shopizer/types/requestWithUser.interface";
import { Router, Request, Response, NextFunction } from "express";
import UserNotFoundException from "./exceptions/UserNotFoundException";
import NotAuthorizedException from "./exceptions/NotAuthorizedException";
import { Controller, Get } from "@shopizer/decorators";
import UserService from "./user.service";

@Controller("user")
class UserController {
  userServices = new UserService();

  constructor() {}

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
}

export default UserController;
