import HttpException from "@shopizer/helpers/HttpException";

class ProductNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Product with id ${id} not found`);
  }
}

export default ProductNotFoundException;
