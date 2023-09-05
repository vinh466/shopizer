import { NextFunction, Response } from "express";
import * as jwt from "jsonwebtoken";
import AuthenticationTokenMissingException from "../../modules/authentication/exceptions/AuthenticationTokenMissingException";
import RequestWithUser from "../types/requestWithUser.interface";
import DataStoredInToken from "../types/dataStoredInToken";
import WrongAuthenticationTokenException from "@shopizer/modules/authentication/exceptions/WrongAuthenticationTokenException";

async function authMiddleware(
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
      ) as DataStoredInToken;
      const id = verificationResponse.id;
      const user: any = {};
      if (user) {
        request.user = user;
        next();
      } else {
        next(new WrongAuthenticationTokenException());
      }
    } catch (error) {
      next(new WrongAuthenticationTokenException());
    }
  } else {
    next(new AuthenticationTokenMissingException());
  }
}

export default authMiddleware;
