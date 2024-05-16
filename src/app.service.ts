import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getProducts() {
    return this.prisma.product.findMany({
      include: {
        prices: true,
        productInfo: true,
      },
    });
  }

  async getProduct(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
      include: { prices: true, productInfo: true },
    });
  }
}
