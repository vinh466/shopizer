import { RouteDefinition } from "@shopizer/types/controller.interface";
import { HttpMethods } from "@shopizer/types/http-methods";
import { RequestHandler } from "express";

export const METHOD_KEY = "method";

const getMethodFunction = (
  method: HttpMethods,
  path: string,
  middlewares: RequestHandler[]
): MethodDecorator => {
  return (target, propertyKey): void => {
    if (!Reflect.hasMetadata(METHOD_KEY, target.constructor)) {
      Reflect.defineMetadata(METHOD_KEY, [], target.constructor);
    }

    const routes = Reflect.getMetadata(
      METHOD_KEY,
      target.constructor
    ) as Array<RouteDefinition>;

    routes.push({
      path,
      middlewares,
      requestMethod: method,
      methodName: propertyKey,
    });

    Reflect.defineMetadata(METHOD_KEY, routes, target.constructor);
  };
};

export const Get = (
  path: string,
  ...middlewares: RequestHandler[]
): MethodDecorator => getMethodFunction(HttpMethods.GET, path, middlewares);
export const Post = (
  path: string,
  ...middlewares: RequestHandler[]
): MethodDecorator => getMethodFunction(HttpMethods.POST, path, middlewares);
export const Put = (
  path: string,
  ...middlewares: RequestHandler[]
): MethodDecorator => getMethodFunction(HttpMethods.PUT, path, middlewares);
export const Patch = (
  path: string,
  ...middlewares: RequestHandler[]
): MethodDecorator => getMethodFunction(HttpMethods.PATCH, path, middlewares);
export const Delete = (
  path: string,
  ...middlewares: RequestHandler[]
): MethodDecorator => getMethodFunction(HttpMethods.DELETE, path, middlewares);
export const Route = (
  method: HttpMethods,
  path: string,
  ...middlewares: RequestHandler[]
): MethodDecorator => getMethodFunction(method, path, middlewares);
