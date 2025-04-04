import { NextFunction, Request } from "express";
import HttpException from "@shopizer/helpers/HttpException";

function errorMiddleware(
  error: HttpException,
  request: Request,
  response: any,
  next: NextFunction
) {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  const errors = error.errors;
  response.status(status).send({
    message,
    status,
    errors,
  });
}

export default errorMiddleware;
