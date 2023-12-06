import { $Enums, Prisma } from "@prisma/client";
import { prisma } from "@shopizer/helpers/prisma.helper";

class AdminService {
  public prisma = prisma;


  async getSellerList(
    {
      search = "",
      currentPage = 1,
      pageSize = 10,
      sort,
      filter,
    }: {
      search?: string;
      currentPage?: number;
      pageSize?: number;
      sort?: string;
      filter?: {
        listType?: string
      };
    } = {},
    sellerId: string) {
    const whereQuery: Prisma.SellerWhereInput = {
    };
    if (filter?.listType) {
      whereQuery['status'] = {
        equals: filter.listType as any
      }
    }
    const query: Prisma.SellerFindManyArgs = {
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
      include: {
        pickupAddress: {
          include: {
            district: true,
            province: true,
            ward: true,
          }
        },
        user: true
      },
      where: whereQuery,
    };
    const [results, count] = await prisma.$transaction([
      this.prisma.seller.findMany(query),
      prisma.seller.count({ where: query.where }),
    ]);
    return {
      pageSize,
      currentPage,
      total: count,
      results,
    };
  }



  async changeSellerStatus(sellerId: string, status: $Enums.SellerStatus) {
    return this.prisma.seller.update({
      where: {
        id: sellerId
      },
      data: {
        status
      }
    })
  }

}

export default AdminService;
