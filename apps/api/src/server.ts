import "dotenv/config";
import App from "./app";
import AuthenticationController from "@shopizer/modules/authentication/authentication.controller";
import UserController from "@shopizer/modules/user/user.controller";
import ProductController from "./modules/product/product.controller";
import validateEnv from "@shopizer/helpers/validateEnv";
import { OrderController } from "./modules/order/order.controller";
import { ProductCategoryController } from "./modules/product-category/product-category.controller";
import { SummaryController } from "./modules/summary/summary.controller";
import { ProvincesController } from "./modules/provinces/provinces.controller";

validateEnv();
const app = new App([
  OrderController,
  AuthenticationController,
  UserController,
  ProductController,
  ProductCategoryController,
  SummaryController,
  ProvincesController,
]);

app.listen();
