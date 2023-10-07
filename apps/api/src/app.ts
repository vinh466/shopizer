import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import { RouteDefinition } from "@shopizer/types/controller.interface";
import errorMiddleware from "@shopizer/middleware/error.middleware";
import { prisma } from "@shopizer/helpers/prisma.helper";
import * as morgan from "morgan";
import "reflect-metadata";
import * as path from "path";
import {
  CONTROLLER_KEY,
  METHOD_KEY,
  MIDDLEWARE_KEY,
} from "@shopizer/decorators";
class App {
  public app: express.Application;

  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor(controllers: Function[]) {
    this.app = express();

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  public async listen() {
    await this.connectToTheDatabase();
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(morgan("dev"));
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: any[]) {
    for (const controller of controllers) {
      const instance = new controller();
      const prefix = Reflect.getMetadata(CONTROLLER_KEY, controller);
      const routes: RouteDefinition[] = Reflect.getMetadata(
        METHOD_KEY,
        controller
      );
      const middlewares: any[] = Reflect.getMetadata(
        MIDDLEWARE_KEY,
        controller
      );
      routes?.forEach((route) => {
        if (prefix && route.path) {
          const routePath = path
            .join("/", prefix, route.path)
            .replace(/\\/g, "/");

          const handler = (
            req: Request,
            res: Response,
            next: express.NextFunction
          ) => instance[route.methodName](req, res, next);

          this.app[route.requestMethod](
            routePath,
            ...middlewares,
            ...route.middlewares,
            handler as any
          );
        }
      });

      console.log(`Module [${prefix}] is loaded`);
    }
  }

  private async connectToTheDatabase() {
    try {
      await prisma.$connect();
      console.log(`\nDatabase is Connected`);
    } catch (error) {
      console.error(`Error connecting to database: ${error.message}`);
    } finally {
      await prisma.$disconnect();
    }
  }
}

export default App;
