import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductInfo } from '../models/productInfo';
import { CreateProductInfoInput } from '../utils/createProductInfoInput';

@Resolver(() => ProductInfo)
export class ProductInfoResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Mutation(() => ProductInfo)
  async createProductInfo(@Args('data') data: CreateProductInfoInput) {
    return this.prisma.productInfo.create({
      data,
    });
  }
}
