import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PrismaService } from '../../prisma/prisma.service';
import { Product } from '../models/product';
import { CreateProductInput } from '../utils/createProductInput';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [Product])
  async products() {
    return this.prisma.product.findMany({
      include: { prices: true, productInfo: true },
    });
  }

  @Query(() => Product, { nullable: true })
  async product(@Args('id') id: number) {
    return this.prisma.product.findUnique({
      where: { id },
      include: { prices: true, productInfo: true },
    });
  }

  @Mutation(() => Product)
  async createProduct(@Args('data') data: CreateProductInput) {
    const existingProduct = await this.prisma.product.findUnique({
      where: { title: data.title },
    });

    if (existingProduct) {
      return this.prisma.product.update({
        where: { title: data.title },
        data,
      });
    } else {
      return this.prisma.product.create({
        data,
      });
    }
  }
}
