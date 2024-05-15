import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Price } from './price.entity';

@ObjectType()
export class Product {
  @Field(type => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  imageUrl: string;

  @Field(type => [Price])
  prices: Price[];
}
