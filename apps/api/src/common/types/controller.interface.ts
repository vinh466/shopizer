import { Router } from "express";
import { HttpMethods } from "./http-methods";
import { RequestHandler } from "express";

export interface RouteDefinition {
  // Path to our route
  path: string;
  // HTTP Request method (get, post, ...)
  requestMethod: HttpMethods;
  // Method name within our class responsible for this route
  methodName: string | symbol;
  // middlewares to execute before method
  middlewares: RequestHandler[];
}
