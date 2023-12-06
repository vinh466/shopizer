import HttpException from "@shopizer/helpers/HttpException";

class ProductCannotDeleteFoundException extends HttpException {
  constructor() {
    super(404, `Sản phẩm này không thể xóa`);
  }
}

export default ProductCannotDeleteFoundException;
