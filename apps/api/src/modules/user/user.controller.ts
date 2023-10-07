import authMiddleware from "@shopizer/middleware/auth.middleware";
import RequestWithUser from "@shopizer/types/requestWithUser.interface";
import { Router, Request, Response, NextFunction } from "express";
import UserNotFoundException from "./exceptions/UserNotFoundException";
import NotAuthorizedException from "./exceptions/NotAuthorizedException";
import { Controller, Get } from "@shopizer/decorators";

@Controller("user")
class UserController {
  private post = {} as any;
  private user = {} as any;

  constructor() {}

  @Get("/:id", authMiddleware)
  async getUserById(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;
    const userQuery = this.user.findById(id);
    if (request.query.withPosts === "true") {
      userQuery.populate("posts").exec();
    }
    const user = await userQuery;
    if (user) {
      response.send(user);
    } else {
      next(new UserNotFoundException(id));
    }
  }
  @Get("/:id/posts", authMiddleware)
  async getAllPostsOfUser(
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) {
    const userId = request.params.id;
    if (userId === request.user.id.toString()) {
      const posts = await this.post.find({ author: userId });
      response.send(posts);
    }
    next(new NotAuthorizedException());
  }
}

export default UserController;
