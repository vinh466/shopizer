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

        },
      },
    });
  }
}

export default UserService;
