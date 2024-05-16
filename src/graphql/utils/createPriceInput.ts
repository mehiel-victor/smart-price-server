import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePriceInput {
  @Field()
  min: number;

  @Field()
  med: number;

  @Field()
  max: number;

  @Field()
  productId: number;
}
