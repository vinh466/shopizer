import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import User from "../user/user.interface";
import UserWithThatEmailAlreadyExistsException from "../user/exceptions/UserWithThatEmailAlreadyExistsException";
import TokenData from "@shopizer/types/tokenData.interface";
import DataStoredInToken from "@shopizer/types/dataStoredInToken";
import CreateUserDto from "../user/dto/user.dto";
import UserService from "../user/user.service";

class AuthenticationService {
  public user = new UserService();

  public async register(userData: CreateUserDto) {
    if (await this.user.findOne({ email: userData.email })) {
      throw new UserWithThatEmailAlreadyExistsException(userData.email);
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await this.user.create({
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      password: hashedPassword,
    });
    const tokenData = this.createToken(user);
    return {
      tokenData,
      user,
    };
  }
  public createToken(user: User): TokenData {
    const expiresIn = 60 * 60; // an hour
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken: DataStoredInToken = {
      id: user.id,
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  }
}

export default AuthenticationService;
