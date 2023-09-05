import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import Controller from "@shopizer/types/controller.interface";
import errorMiddleware from "@shopizer/middleware/error.middleware";
import { prisma } from "@shopizer/helpers/prisma.helper";
import * as session from "express-session";
import * as morgan from "morgan";
import "reflect-metadata";
class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  public listen() {
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
    // this.app.use(
    //   session({
    //     secret: "secret",
    //     resave: true,
    //     saveUninitialized: true,
    //   })
    // );
    this.app.use(morgan("dev"));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  private async connectToTheDatabase() {
    try {
      await prisma.$connect();
      console.log(`Connected to database`);
    } catch (error) {
      console.error(`Error connecting to database: ${error.message}`);
    } finally {
      await prisma.$disconnect();
    }
  }
}

export default App;
