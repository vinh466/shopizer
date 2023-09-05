import authMiddleware from "@shopizer/middleware/auth.middleware";
import Controller from "@shopizer/types/controller.interface";
import RequestWithUser from "@shopizer/types/requestWithUser.interface";
import { Router, Request, Response, NextFunction } from "express";
import UserNotFoundException from "./exceptions/UserNotFoundException";
import NotAuthorizedException from "./exceptions/NotAuthorizedException";

class UserController implements Controller {
  public path = "/users";
  public router = Router();
  private post = {} as any;
  private user = {} as any;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, authMiddleware, this.getUserById);
    this.router.get(
      `${this.path}/:id/posts`,
      authMiddleware,
      this.getAllPostsOfUser
    );
  }

  private getUserById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
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
  };

  private getAllPostsOfUser = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const userId = request.params.id;
    if (userId === request.user.id.toString()) {
      const posts = await this.post.find({ author: userId });
      response.send(posts);
    }
    next(new NotAuthorizedException());
  };
}

export default UserController;
