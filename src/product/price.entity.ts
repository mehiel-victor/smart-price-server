import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Price {
  @Field(type => Int)
  id: number;

  @Field(type => Int)
  productId: number;

  @Field(type => Int)
  min: number;

  @Field(type => Int)
  med: number;

  @Field(type => Int)
  max: number;

  @Field()
  date: Date;
}
