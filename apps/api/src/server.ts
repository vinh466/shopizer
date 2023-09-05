import "dotenv/config";
import App from "./app";
import AuthenticationController from "@shopizer/modules/authentication/authentication.controller";
import UserController from "@shopizer/modules/user/user.controller";
import ProductController from "./modules/product/product.controller";
import validateEnv from "@shopizer/helpers/validateEnv";

validateEnv();
console.log(process.env.DATABASE_URL);
const app = new App([
  new AuthenticationController(),
  new UserController(),
  new ProductController(),
]);

app.listen();
