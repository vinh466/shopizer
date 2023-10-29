import { Request, Response, NextFunction, Router } from "express";
import authMiddleware from "@shopizer/middleware/auth.middleware";
import ProductNotFoundException from "./exceptions/ProductNotFoundException";
import RequestWithUser from "@shopizer/types/requestWithUser.interface";
import ProductService from "./product.service";
import CreateProductDto from "./dto/createProduct.dto";
import UpdateProductDto from "./dto/updateProduct.dto";
import { Controller, Delete, Get, Patch, Post } from "@shopizer/decorators";
import { DtoValidation } from "@shopizer/middleware";
import { PrismaClient } from "@prisma/client";
import { FileUploadMiddleware } from "@shopizer/middleware/file-update.middleware";
import { MulterError } from "multer";

@Controller("product")
class ProductController {
  private productService = new ProductService();

  prisma = new PrismaClient();

  constructor() {}

  @Get("/list")
  async getProduct(request: Request, response: Response) {
    const product = await this.productService.find();
    response.json(product);
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
  @Patch("/:id", authMiddleware, DtoValidation(UpdateProductDto))
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
  @Post("/", authMiddleware, DtoValidation(CreateProductDto))
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

  @Post(
    "/update-image",
    authMiddleware,
    FileUploadMiddleware({
      fields: [{ name: "product", maxCount: 1 }],
      dest: "images/products",
    })
  )
  async updateImage(request: Request, response: Response) {
    const file = request.files?.["product"]?.[0];
    if (file === undefined) {
      return response.status(400).json({
        error: true,
        message: "Tải file không thành công xin hãy thử lại!",
      });
    }
    return response.status(200).json({
      success: true,
      file,
    });
  }
}

export default ProductController;
