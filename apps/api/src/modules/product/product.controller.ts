import { Request, Response, NextFunction, Router } from "express";
import Controller from "@shopizer/types/controller.interface";
import authMiddleware from "@shopizer/middleware/auth.middleware";
import validationMiddleware from "@shopizer/middleware/validation.middleware";
import ProductNotFoundException from "./exceptions/ProductNotFoundException";
import RequestWithUser from "@shopizer/types/requestWithUser.interface";
import ProductService from "./product.service";
import CreateProductDto from "./dto/createProduct.dto";
import UpdateProductDto from "./dto/updateProduct.dto";

class ProductController implements Controller {
  public path = "/product";
  public router = Router();
  private productService = new ProductService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAll);
    this.router.get(`${this.path}/:id`, this.getById);
    this.router
      .all(`${this.path}/*`, authMiddleware)
      .patch(
        `${this.path}/:id`,
        validationMiddleware(CreateProductDto),
        this.modify
      )
      .delete(`${this.path}/:id`, this.delete)
      .post(
        this.path,
        authMiddleware,
        validationMiddleware(CreateProductDto),
        this.create
      );
  }

  private getAll = async (request: Request, response: Response) => {
    const product = await this.productService.find();
    response.send(product);
  };

  private getById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    const product = await this.productService.findById(id);
    if (product) {
      response.send(product);
    } else {
      next(new ProductNotFoundException(id));
    }
  };

  private modify = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    const productData: UpdateProductDto = request.body;
    const product = await this.productService.findByIdAndUpdate(
      id,
      productData
    );
    if (product) {
      response.send(product);
    } else {
      next(new ProductNotFoundException(id));
    }
  };

  private create = async (request: RequestWithUser, response: Response) => {
    const productData: CreateProductDto = request.body;
    const createdProduct = await this.productService.create(productData);
    response.json(createdProduct);
  };

  private delete = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    const successResponse = await this.productService.findByIdAndDelete(id);
    if (successResponse) {
      response.send(200);
    } else {
      next(new ProductNotFoundException(id));
    }
  };
}

export default ProductController;
