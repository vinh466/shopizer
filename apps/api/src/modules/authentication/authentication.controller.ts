import * as bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import AuthenticationService from "./authentication.service";
import LogInDto from "./dto/logIn.dto";
import validationMiddleware from "@shopizer/middleware/validation.middleware";
import WrongCredentialsException from "./exceptions/WrongCredentialsException";
import CreateUserDto from "../user/dto/user.dto";
import UserService from "../user/user.service";
import { Controller, Post } from "@shopizer/decorators";

@Controller("auth")
class AuthenticationController {
  public authenticationService = new AuthenticationService();
  public userService = new UserService();

  constructor() {}

  @Post("register", validationMiddleware(LogInDto))
  async registration(request: Request, response: Response, next: NextFunction) {
    const userData: CreateUserDto = request.body;
    try {
      const { tokenData, user } = await this.authenticationService.register(
        userData
      );
      response.json({ user, accessToken: tokenData.token });
    } catch (error) {
      next(error);
    }
  }

  @Post("login", validationMiddleware(LogInDto))
  async loggingIn(request: Request, response: Response, next: NextFunction) {
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
  }

  @Post("logout")
  loggingOut(request: Request, response: Response) {
    return response.status(200).json({ message: "Logout successful" });
  }
}

export default AuthenticationController;
