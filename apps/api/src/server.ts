import "dotenv/config";
import App from "./app";
import AuthenticationController from "@shopizer/modules/authentication/authentication.controller";
import UserController from "@shopizer/modules/user/user.controller";
import ProductController from "./modules/product/product.controller";
import validateEnv from "@shopizer/helpers/validateEnv";
import { OrderController } from "./modules/order/order.controller";

validateEnv();
const app = new App([
  OrderController,
  AuthenticationController,
  UserController,
  ProductController,
]);

app.listen();
