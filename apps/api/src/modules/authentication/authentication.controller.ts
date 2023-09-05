import * as bcrypt from "bcrypt";
import { Request, Response, NextFunction, Router } from "express";
import * as jwt from "jsonwebtoken";
import AuthenticationService from "./authentication.service";
import LogInDto from "./dto/logIn.dto";
import Controller from "@shopizer/types/controller.interface";
import validationMiddleware from "@shopizer/middleware/validation.middleware";
import WrongCredentialsException from "./exceptions/WrongCredentialsException";
import DataStoredInToken from "@shopizer/types/dataStoredInToken";
import TokenData from "@shopizer/types/tokenData.interface";
import CreateUserDto from "../user/dto/user.dto";
import User from "../user/user.interface";
import UserService from "../user/user.service";

class AuthenticationController implements Controller {
  public path = "/auth";
  public router = Router();
  public authenticationService = new AuthenticationService();
  public userService = new UserService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      this.path + "/register",
      validationMiddleware(CreateUserDto),
      this.registration
    );
    this.router.post(
      this.path + "/login",
      validationMiddleware(LogInDto),
      this.loggingIn
    );
    this.router.post(this.path + "/logout", this.loggingOut);
  }

  private registration = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const userData: CreateUserDto = request.body;
    try {
      const { tokenData, user } = await this.authenticationService.register(
        userData
      );
      response.json({ user, accessToken: tokenData.token });
    } catch (error) {
      next(error);
    }
  };

  private loggingIn = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const logInData: LogInDto = request.body;
    const user = await this.userService.findOne({ email: logInData.email });
    if (user) {
      const isPasswordMatching = await bcrypt.compare(
        logInData.password,
        user.password
      );
      if (isPasswordMatching) {
        const tokenData = this.authenticationService.createToken(user);
        response.json({ user, accessToken: tokenData.token });
      } else {
        next(new WrongCredentialsException());
      }
    } else {
      next(new WrongCredentialsException());
    }
  };

  private loggingOut = (request: Request, response: Response) => {
    response.status(200);
  };
}

export default AuthenticationController;
