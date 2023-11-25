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
import authMiddleware from "@shopizer/middleware/auth.middleware";
import AdminSignInDto from "./dto/admin-sign-in.dto";

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
    try {
      const logInData: SignInDto = request.body;
      const user = await this.userService.findByEmail({ email: logInData.email });
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
    catch (error) {
      console.error(error)
      next(error);
    }
  }

  @Post("admin/sign-in", DtoValidation(AdminSignInDto))
  async adminSignIn(request: Request, response: Response, next: NextFunction) {
    try {
      const logInData: AdminSignInDto = request.body;
      const admin = await this.userService.findAdminByUsername({ username: logInData.username });
      if (admin) {
        const isPasswordMatching = await bcrypt.compare(
          logInData.password,
          admin.password
        );
        if (isPasswordMatching) {
          const tokenData = this.authenticationService.createAdminToken(admin);
          setTimeout(() => {
            response.json({ admin, accessToken: tokenData.token });
          }, 2000);
        } else {
          next(new WrongCredentialsException());
        }
      } else {
        next(new WrongCredentialsException());
      }
    }
    catch (error) {
      console.error(error)
      next(error);
    }
  }

  @Post("admin/sign-up")
  async adminSignUp(request: Request, response: Response, next: NextFunction) {
    const userData: CreateUserDto = request.body;
    try {
      const { tokenData, admin } = await this.authenticationService.createAdmin();
      response.json({ admin, accessToken: tokenData.token });
    } catch (error) {
      next(error);
    }
  }
  @Post("sign-out")
  loggingOut(request: Request, response: Response, next: NextFunction) {
    return response.status(200).json({ message: "Logout successful" });
  }

  @Post("seller/verify", authMiddleware)
  async sellerVerify(request: Request, response: Response, next: NextFunction) {
    try {
      const userId = request.user.id
      const payload = request.body || {}
      const result = await this.authenticationService.sellerVerify({ userId, ...payload })
      return response.status(200).json({ results: result });
    } catch (error) {
      console.error(error)
      next(error)
    }
  }
}

export default AuthenticationController;
