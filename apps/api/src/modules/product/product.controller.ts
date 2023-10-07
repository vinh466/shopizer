import { Request, Response, NextFunction, Router } from "express";
import authMiddleware from "@shopizer/middleware/auth.middleware";
import validationMiddleware from "@shopizer/middleware/validation.middleware";
import ProductNotFoundException from "./exceptions/ProductNotFoundException";
import RequestWithUser from "@shopizer/types/requestWithUser.interface";
import ProductService from "./product.service";
import CreateProductDto from "./dto/createProduct.dto";
import UpdateProductDto from "./dto/updateProduct.dto";
import { Controller, Delete, Get, Patch, Post } from "@shopizer/decorators";

@Controller("product")
class ProductController {
  private productService = new ProductService();

  constructor() {}

  @Get("/")
  async getAll(request: Request, response: Response) {
    const product = await this.productService.find();
    response.send(product);
  }
  @Get("/:id")
  async getById(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;
    const product = await this.productService.findById(id);
    if (product) {
      response.send(product);
    } else {
      next(new ProductNotFoundException(id));
    }
  }
  @Patch("/:id", authMiddleware, validationMiddleware(CreateProductDto))
  async modify(request: Request, response: Response, next: NextFunction) {
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
  }
  @Post("/", authMiddleware, validationMiddleware(CreateProductDto))
  async create(request: RequestWithUser, response: Response) {
    const productData: CreateProductDto = request.body;
    const createdProduct = await this.productService.create(productData);
    response.json(createdProduct);
  }
  @Delete("/:id", authMiddleware)
  async delete(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;
    const successResponse = await this.productService.findByIdAndDelete(id);
    if (successResponse) {
      response.send(200);
    } else {
      next(new ProductNotFoundException(id));
    }
  }
}

export default ProductController;
