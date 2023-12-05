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
import { toInteger } from "lodash";

@Controller("product")
class ProductController {
  private productService = new ProductService();

  prisma = new PrismaClient();

  constructor() { }
  @Get("seller-list/product")
  async getSellerListProduct(request: Request, response: Response) {
    const product = await this.productService.findAll();
    response.json(product);
  }
  @Get("/list")
  async getProduct(request: Request, response: Response) {
    const { type } = request.query
    let result = null
    if (!type) result = await this.productService.findAll();
    if (type === 'seller-group') result = await this.productService.productSellerGroup();
    response.json(result);
  }
  @Get("/seller/list", authMiddleware,)
  async getSellerProduct(request: Request, response: Response) {
    const id = request.user.id;

    const { search = "", currentPage = 1, pageSize = 10, listType } = request.query as { [key: string]: string }

    const product = await this.productService.sellerFind({
      search,
      currentPage: toInteger(currentPage) || 1,
      pageSize: toInteger(pageSize) || 1,
      filter: {
        listType
      }
    }, id);
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
    const sellerId = request.user.id;
    const id = request.params.id;
    const productData: CreateProductDto = request.body;
    try {
      const createdProduct = await this.productService.update(id, productData, sellerId);
      response.status(201).json({
        message: "Cập nhập phẩm thành công",
        data: createdProduct,
      })
    } catch (error) {
      console.error(error)
      next(error)
    }
  }
  @Post("/", authMiddleware, DtoValidation(CreateProductDto))
  async create(request: RequestWithUser, response: Response, next: NextFunction) {
    const id = request.user.id;
    const productData: CreateProductDto = request.body;
    try {
      const createdProduct = await this.productService.create(productData, id);
      response.status(201).json({
        message: "Tạo sản phẩm thành công",
        data: createdProduct,
      })
    } catch (error) {
      console.error(error)
      next(error)
    }
  }
  @Delete("/:id", authMiddleware)
  async delete(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;
    console.log(id)
    const successResponse = await this.productService.findByIdAndDelete(id);
    if (successResponse) {
      response.send(200);
    } else {
      next(new ProductNotFoundException(id));
    }
  }

  @Post(
    "/image/update",
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
