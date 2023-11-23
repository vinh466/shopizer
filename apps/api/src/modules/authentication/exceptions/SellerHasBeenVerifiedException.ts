import HttpException from "@shopizer/helpers/HttpException";

class SellerHasBeenVerifiedException extends HttpException {
    constructor() {
        super(409, "Seller has been Verified");
    }
}

export default SellerHasBeenVerifiedException;
