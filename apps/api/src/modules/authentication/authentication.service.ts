import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import User from "../user/user.interface";
import UserWithThatEmailAlreadyExistsException from "../user/exceptions/UserWithThatEmailAlreadyExistsException";
import TokenData from "@shopizer/types/tokenData.interface";
import DataStoredInToken from "@shopizer/types/dataStoredInToken";
import CreateUserDto from "../user/dto/user.dto";
import UserService from "../user/user.service";
import { exclude } from "@shopizer/utils/prisma-utils";
import { prisma } from "@shopizer/helpers/prisma.helper";
import SellerHasBeenVerifiedException from "./exceptions/SellerHasBeenVerifiedException";
import { Admin } from "@prisma/client";
import HttpException from "@shopizer/helpers/HttpException";

class AuthenticationService {
  public user = new UserService();
  private prisma = prisma;

  public async register(userData: CreateUserDto) {
    if (await this.user.findByEmail({ email: userData.email })) {
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
  public async createAdmin() {
    if (await this.prisma.admin.findFirst({ where: { username: "admin" } })) {
      throw new HttpException(400, "Admin has been created")
    }
    const hashedPassword = await bcrypt.hash("admin", 10);
    const admin = await this.prisma.admin.create({
      data: {
        username: "admin",
        password: hashedPassword
      },
    })
    const tokenData = this.createAdminToken(admin);
    return {
      tokenData,
      admin,
    };
  }
  public createToken(user: User): TokenData {
    const expiresIn = 60 * 60 * 24 * 100; // an hour
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken: any//DataStoredInToken 
      = exclude(user, ['password'])
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  }
  public createAdminToken(admin: Admin): TokenData {
    const expiresIn = 60 * 60 * 24 * 100; // an hour
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken: any//DataStoredInToken 
      = exclude(admin, ['password'])
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  }
  public async sellerVerify(verifyData: any) {
    const seller = await this.prisma.seller.findFirst({ where: { id: verifyData.userId } })
    console.log("seller", seller)
    if (seller && seller.status !== 'REJECTED') throw new SellerHasBeenVerifiedException()
    if (seller && seller.status === 'REJECTED') {
      await this.prisma.seller.delete({ where: { id: verifyData.userId } })
    }

    const result = await this.prisma.seller.create({
      data: {
        name: verifyData.shopName,

        pickupAddress: {
          create: {
            phone: verifyData.phone,
            detail: verifyData.address.detail,
            district: { connect: { code: verifyData.address.district } },
            province: { connect: { code: verifyData.address.province } },
            ward: { connect: { code: verifyData.address.ward } },
          }
        },
        user: {
          connect: {
            id: verifyData.userId
          }
        }
      },
      include: {
        pickupAddress: {
          include: {
            district: true,
            province: true,
            ward: true
          }
        },
        user: true
      }
    })

    return result
  }
}

export default AuthenticationService;
