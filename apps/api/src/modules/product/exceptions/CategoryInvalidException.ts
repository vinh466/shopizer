import HttpException from "@shopizer/helpers/HttpException";

class CategoryInvalidException extends HttpException {
    constructor() {
        super(422, `Category invalid`);
    }
}

export default CategoryInvalidException;
