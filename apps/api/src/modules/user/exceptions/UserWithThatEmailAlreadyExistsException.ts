import HttpException from "@shopizer/helpers/HttpException";

class UserWithThatEmailAlreadyExistsException extends HttpException {
  constructor(email: string) {
    super(400, `Email ${email} đã được sử dụng`);
  }
}

export default UserWithThatEmailAlreadyExistsException;

