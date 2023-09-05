import { prisma } from "@shopizer/helpers/prisma.helper";
import CreateUserDto from "./dto/user.dto";

class UserService {
  public prisma = prisma;

  public async findOne({ email }: { email: string }) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  public async create(data: CreateUserDto) {
    return await this.prisma.user.create({ data });
  }
}

export default UserService;
