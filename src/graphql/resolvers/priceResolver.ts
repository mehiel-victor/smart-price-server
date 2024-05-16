import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { PrismaService } from '../../prisma/prisma.service';
import { Price } from '../models/price';
import { CreatePriceInput } from '../utils/createPriceInput';

@Resolver(() => Price)
export class PriceResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Mutation(() => Price)
  async createPrice(@Args('data') data: CreatePriceInput) {
    return this.prisma.price.create({
      data,
    });
  }
}
