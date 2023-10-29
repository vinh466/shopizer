import * as bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import AuthenticationService from "./authentication.service";
import WrongCredentialsException from "./exceptions/WrongCredentialsException";
import CreateUserDto from "../user/dto/user.dto";
import UserService from "../user/user.service";
import { Controller, Post } from "@shopizer/decorators";
import { DtoValidation } from "@shopizer/middleware";
import SignInDto from "./dto/sign-in.dto";
import { set } from "lodash";

@Controller("auth")
class AuthenticationController {
  public authenticationService = new AuthenticationService();
  public userService = new UserService();

  constructor() {}

  @Post("sign-up", DtoValidation(CreateUserDto))
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

  @Post("sign-in", DtoValidation(SignInDto))
  async loggingIn(request: Request, response: Response, next: NextFunction) {
    const logInData: SignInDto = request.body;
    const user = await this.userService.findOne({ email: logInData.email });
    if (user) {
      const isPasswordMatching = await bcrypt.compare(
        logInData.password,
        user.password
      );
      if (isPasswordMatching) {
        const tokenData = this.authenticationService.createToken(user);
        setTimeout(() => {
          response.json({ user, accessToken: tokenData.token });
        }, 2000);
      } else {
        next(new WrongCredentialsException());
      }
    } else {
      next(new WrongCredentialsException());
    }
  }

  @Post("sign-out")
  loggingOut(request: Request, response: Response) {
    return response.status(200).json({ message: "Logout successful" });
  }
}

export default AuthenticationController;
