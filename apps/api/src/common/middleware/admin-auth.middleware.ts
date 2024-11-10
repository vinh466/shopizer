import { NextFunction, Response } from "express";
import * as jwt from "jsonwebtoken";
import AuthenticationTokenMissingException from "../../modules/authentication/exceptions/AuthenticationTokenMissingException";
import RequestWithUser from "../types/requestWithUser.interface";
import DataStoredInToken from "../types/dataStoredInToken";
import WrongAuthenticationTokenException from "@shopizer/modules/authentication/exceptions/WrongAuthenticationTokenException";
import UserService from "@shopizer/modules/user/user.service";

async function adminAuthMiddleware(
  request: RequestWithUser,
  response: Response,
  next: NextFunction
) {
  const headers = request.headers;
  if (headers && headers.authorization) {
    const secret = process.env.JWT_SECRET;
    try {
      const verificationResponse = jwt.verify(
        headers.authorization.replace("Bearer ", ""),
        secret
      ) as any // as DataStoredInToken; 
      const user = verificationResponse
      if (user) {
        request.user = user;
        return next();
      } else {
        return next(new WrongAuthenticationTokenException());
      }
    } catch (error) {
      return next(new WrongAuthenticationTokenException());
    }
  } else {
    return next(new AuthenticationTokenMissingException());
  }
}

export default adminAuthMiddleware;
