export const CONTROLLER_KEY = "controllers";
export const MIDDLEWARE_KEY = "middlewares";

import { RequestHandler } from "express";
import { METHOD_KEY } from "./api-methods.decorator";

export const Controller = (
  prefix = "",
  ...middlewares: RequestHandler[]
): ClassDecorator => {
  return (target: any, ...log) => {
    Reflect.defineMetadata(CONTROLLER_KEY, prefix, target);

    if (!Reflect.hasMetadata(METHOD_KEY, target)) {
      Reflect.defineMetadata(METHOD_KEY, [], target);
    }

    if (!Reflect.hasMetadata(MIDDLEWARE_KEY, target)) {
      Reflect.defineMetadata(MIDDLEWARE_KEY, middlewares, target);
    }
  };
};
