import { Field, ObjectType } from '@nestjs/graphql';
import { Price } from './price';
import { ProductInfo } from './productInfo';

@ObjectType()
export class Product {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field()
  imageUrl: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [Price])
  prices: Price[];

  @Field(() => [ProductInfo])
  productInfo: ProductInfo[];
}
