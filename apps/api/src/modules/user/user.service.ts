import { prisma } from "@shopizer/helpers/prisma.helper";
import CreateUserDto from "./dto/user.dto";

class UserService {
  public prisma = prisma;

  async findById(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  public async findByEmail({ email }: { email: string }) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }


  public async findAdminByUsername({ username }: { username: string }) {
    return await this.prisma.admin.findUnique({
      where: {
        username,
      },
    });
  }

  public async create(data: CreateUserDto) {
    return await this.prisma.user.create({ data });
  }

  async findSellerById(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        seller: {
          include: {
            pickupAddress: true,
          }
        },
      },
    });
  }

  async updateSellerProfile(data: any) {
    const result = await this.prisma.seller.update({
      where: {
        id: data.id
      },
      data: {
        name: data.shopName,
        image: data.image?.[0]?.uid,
        pickupAddress: {
          update: {
            where: {
              id: data.address.id
            },
            data: {
              phone: data.phone,
              detail: data.address.detail,
              district: { connect: { code: data.address.district } },
              province: { connect: { code: data.address.province } },
              ward: { connect: { code: data.address.ward } },
            }
          }
        },
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

export default UserService;
